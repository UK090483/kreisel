export type mailboxResult = { name: string; token: string; address: string };

import parse from "emailjs-mime-parser";

export const getMailbox = () => {
  return cy
    .request<{ result: mailboxResult }>(
      "put",
      "https://www.developermail.com/api/v1/mailbox"
    )
    .then((res) => {
      return {
        ...res.body.result,
        address: `${res.body.result.name}@developermail.com`,
      };
    });
};
type createUserProps = {
  mailName: string;
  allowMember?: "true";
  allowProfile?: "true";
};
export const createUser = (props: createUserProps) => {
  const searchParams = new URLSearchParams(props);
  return cy.request({
    url: `/api/test/userTest?${searchParams.toString()}`,
    method: "POST",
  });
};

export const deleteTestUsers = () => {
  return cy.request({
    url: `/api/test/userTest`,
    method: "DELETE",
  });
};

export const getLastMail = (props: mailboxResult) => {
  retries({
    check: (res) => {
      //@ts-ignore
      return res.body.result.length > 0;
    },
    cb: () =>
      cy.request({
        url: `https://www.developermail.com/api/v1/mailbox/${props.name}`,
        method: "GET",
        headers: {
          "X-MailboxToken": props.token,
          accept: "application/json",
        },
      }),
  });

  return cy
    .request<{ result: string[] }>({
      url: `https://www.developermail.com/api/v1/mailbox/${props.name}`,
      method: "GET",
      headers: {
        "X-MailboxToken": props.token,
        accept: "application/json",
      },
    })
    .then((res) => {
      cy.log("messages", res);

      const lastMessage = res.body.result[0];

      if (lastMessage) {
        cy.request<{ result: string }>({
          url: `https://www.developermail.com/api/v1/mailbox/${props.name}/messages/${lastMessage}`,
          method: "GET",
          headers: {
            "X-MailboxToken": props.token,
            accept: "application/json",
          },
        }).then((res) => {
          const f = parse(res.body.result);
          const c = f.childNodes[1];
          const html = new TextDecoder().decode(c.content);
          cy.document({}).invoke({}, "write", html);
        });
      }
    });
};

export const login = (mail: string) => {
  cy.visit("/");
  cy.get(`[aria-label="Sign in"]`).click();
  cy.get("#email").type(mail);
  cy.get("button[type=submit]").click();
};

function retries<T extends () => Cypress.Chainable = () => Cypress.Chainable>(
  options: {
    cb: T;
    check: (c: ReturnType<T>) => boolean;
    log?: string;
    maxTime?: number;
  },
  timer?: { count?: number; startTime?: number }
) {
  const { cb, check, log, maxTime = 50 } = options;
  const startTime = timer?.startTime ? timer.startTime : Date.now();

  if (!timer?.count && log) cy.log(log);

  cy.wait(500);

  return new Promise((resolve, reject) => {
    expect((Date.now() - startTime) / 1000, "time").to.be.lte(
      maxTime,
      "maxtime"
    );

    cb().then((res) => {
      if (check(res)) {
        cy.log("time :", (Date.now() - startTime) / 1000);
        resolve(res);
      } else {
        retries(options, {
          count: timer?.count ? timer.count + 1 : 1,
          startTime,
        });
      }
    });
  });
}

export const loginAsFakeUser = (props: Omit<createUserProps, "mailName">) => {
  cy.visit("/");
  cy.intercept("GET", "api/auth/user").as("user");
  getMailbox().then((m) => {
    createUser({ mailName: m.name, ...props });
    login(m.address);
    getLastMail(m);
    cy.get("a").click();
    cy.wait("@user", { timeout: 20000 });
  });
};
