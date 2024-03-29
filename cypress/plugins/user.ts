/// <reference types="cypress" />

const login = () => {
  cy.visit("/");
  cy.get(`[aria-label="Sign in"]`).click();
  let { mail, domain, name } = Cypress.env("testUser");
  cy.get("#email").type(mail);
  cy.get("button[type=submit]").click();
  cy.wait(6000);
  cy.request<{ id: string }[]>({
    url: `https://www.1secmail.com/api/v1/?action=getMessages&login=${name}&domain=${domain}`,
  }).then((res) => {
    const id = res.body[0]?.id;
    cy.request<{ htmlBody?: string }>({
      url: `https://www.1secmail.com/api/v1/?action=readMessage&login=${name}&domain=${domain}&id=${id}`,
    }).then((res) => {
      const linkRx = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;
      const html = res.body.htmlBody || "";
      const matchRes = html.match(linkRx);
      const link = matchRes && matchRes[2];

      if (link) {
        cy.visit(link);
      }
    });
  });
};

export const getLastMail = () => {
  let { mail, domain, name } = Cypress.env("testUser");
  cy.request<{ id: string }[]>({
    url: `https://www.1secmail.com/api/v1/?action=getMessages&login=${name}&domain=${domain}`,
  }).then((res) => {
    const id = res.body[0]?.id;
    cy.request<{ htmlBody?: string }>({
      url: `https://www.1secmail.com/api/v1/?action=readMessage&login=${name}&domain=${domain}&id=${id}`,
    }).then((res) => {
      cy.document({}).invoke({}, "write", res.body.htmlBody);
    });
  });
};

export const loginFakeUser = (props?: {
  sessionName?: string;
  values?: { allowMember?: boolean; allowProfile?: boolean };
  options?: Cypress.SessionOptions;
}) => {
  if (props?.sessionName) {
    cy.setFakerUserValue({ ...props?.values });
    cy.session(
      JSON.stringify({ sessionName: props.sessionName, values: props.values }),
      () => {
        login();
        if (props?.options?.validate) {
          props.options.validate();
        }
      }
    );
  }
  if (!props?.sessionName) {
    cy.setFakerUserValue({ ...props?.values });
    login();
  }
};

export const deleteFakerUser = () => {
  return cy.request({
    url: "/api/test/testUser",
    method: "DELETE",
    failOnStatusCode: false,
  });
};

export const setFakerUserValue = (props: { [k: string]: any }) => {
  const searchParams = new URLSearchParams(props);

  let { mail, domain, name, firstName } = Cypress.env("testUser");

  return cy.request({
    url: `/api/test/testUser?${searchParams.toString()}`,
    method: "POST",
  });
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
  const { cb, check, log, maxTime = 10 } = options;
  const startTime = timer?.startTime ? timer.startTime : Date.now();

  if (!timer?.count && log) cy.log(log);

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
        setTimeout(() => {
          retries(options, {
            count: timer?.count ? timer.count + 1 : 1,
            startTime,
          });
        }, 1000);
      }
    });
  });
}
