import Button from "@components/Button/Button";
import Field from "@components/Form/Field/Field";
import Form from "@components/Form/Form";
import FormContainer from "@components/Form/FormContainer";

import * as React from "react";
import { json } from "stream/consumers";
import { TherapistProfileResult } from "./therapistProfileQuery";

interface IProfileFormProps {
  profileData: TherapistProfileResult;
}

const ProfileForm: React.FunctionComponent<IProfileFormProps> = (props) => {
  const { profileData } = props;

  return (
    <div>
      <Form<TherapistProfileResult>
        onSubmit={async (data) => {
          await handleSubmit(data);
        }}
        options={{ defaultValues: profileData }}
        className={"flex flex-wrap justify-between"}
      >
        <FormContainer label="Personalien" columns={2}>
          <Field name="firstName" type="text" lable="First Name" />
          <Field name="name" type="text" lable="Last Name" />
          <Field name="email" type="email" lable="Email" />
          <Field name="street" type="text" lable="Strasse " />
          <Field name="zipCode" type="text" lable="PLZ" />
          <Field name="city" type="text" lable="Ort" />
        </FormContainer>
        <FormContainer label="more">
          <Field name="jobDescription" type="text" lable="Job Description" />
          <Field name="website" type="url" lable="Website" />
          <Field name="phone" type="tel" lable="Tel" />
        </FormContainer>
      </Form>
    </div>
  );
};
export default ProfileForm;

const handleSubmit = async (data: TherapistProfileResult) => {
  try {
    const res = await fetch("/api/profileSubmit", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
