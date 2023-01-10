import ProfileForm from "./ProfileForm";
import { Profile } from "./validation";
import { profileFields } from "./Fields";
import user from "@testing-library/user-event";
import { render, screen, act } from "@testing-library/react";

type TestProfile = Partial<Profile>;
const testProfile: TestProfile = {
  title: "",
  city: "",
  description: "",
  firstName: "testFirstName",
  jobDescription: "",
  mobile: "",
  name: "testName",
  phone: "",
  street: "",
  website: "",
  zipCode: "",
  education: "",
};

const testData: TestProfile = {
  title: "testTitle",
  city: "testCity",
  description: "testDescription",
  firstName: "testFirstName",
  jobDescription: "testJobDescription",
  mobile: "+45 53856002",
  name: "testName",
  phone: "+45 53856002",
  street: "testStreet",
  website: "https://github.com/",
  zipCode: "testZipCode",
  education: "testEducation",
};

const filteredFields = profileFields.filter(
  (i) => !["email", "image"].includes(i.name)
);
const fetchMock = jest.fn((...props) => {
  return Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  });
});

global.fetch = fetchMock as jest.Mock;

const submit = async () => {
  await user.click(screen.getByRole("button", { name: /submit/i }));
};
const checkResult = (ex: any) => {
  expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toStrictEqual(ex);
};
const ProfileFormRender = async () => {
  await act(() => {
    render(
      <ProfileForm //@ts-ignore
        profile={testProfile}
        allowProfile={true}
      />
    );
  });
};

const checkField = async (props: typeof filteredFields[0]) => {
  const { name, title, type } = props;
  let foundElement: any;
  if (type === "text" || type === "string") {
    foundElement = screen.getByRole("textbox", { name: title });
    //@ts-ignore
    const testString = testData[name];
    await user.clear(foundElement);
    await user.type(foundElement, testString);
    await submit();
    checkResult({
      ...testProfile,
      [name]: testString,
    });
  }

  if (type === "array") {
    foundElement = screen.getByRole("combobox", { name: title });
  }
  if (!foundElement) {
    throw new Error(`missing field test for: ${title}`);
  }
};

describe("Profile Form", () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it.each(filteredFields)("should render field $name", async (field) => {
    await ProfileFormRender();
    await checkField(field);
  });
});
