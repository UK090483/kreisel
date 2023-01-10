import { schema } from "./validation";
import { membershipOptions, degreeOptions } from "./Fields";
import { Profile } from "@lib/Profile/profileQuery";
import Input from "@components/Inputs/input2";
import Textarea from "@components/Inputs/TextArea";
import { DropdownInput } from "@components/Inputs/Dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

interface IProfileFormProps {
  profile?: Partial<Profile>;
  allowProfile?: boolean;
}

const ProfileForm: React.FunctionComponent<IProfileFormProps> = (props) => {
  const { profile, allowProfile } = props;

  const methods = useForm<Profile>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: profile,
    resolver: yupResolver(schema),
  });

  if (!profile) return null;

  const { handleSubmit } = methods;
  const { reset } = methods;

  const _onSubmit: SubmitHandler<Partial<Profile>> = async (data) => {
    return new Promise<void>((resolve, reject) => {
      fetch("api/profile", { method: "POST", body: JSON.stringify(data) }).then(
        () => {
          reset(data);
          resolve();
        }
      );
    });
  };

  return (
    <div className="w-full px-5 max-w-3xl mx-auto">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(_onSubmit)}>
          <DropdownInput
            name="membership"
            label="Mitgliedschaft"
            items={membershipOptions}
            multiple
          />
          <DropdownInput
            name="degree"
            label="Abschlüsse"
            items={degreeOptions}
            multiple
          />
          <Input name="title" label="Title" />
          <div className="grid  md:grid-cols-2 gap-4">
            <Input name="firstName" label="Vorname" />
            <Input name="name" label="Name" />
          </div>

          {allowProfile && (
            <>
              <Input name="phone" label="Tel" type="tel" />
              <Input name="mobile" label="Mobil" type="tel" />
              <Input name="website" label="Website" />
              <Input name="jobDescription" label="Beruf" />

              <div className="grid md:grid-cols-2 gap-4">
                <Input name="street" label="Strasse" />
                <Input name="city" label="Ort" />
                <Input name="zipCode" label="PLZ" />
              </div>
              <Textarea name="description" label="Beschreibung" rows={4} />
              <Textarea name="education" label="Ausbildung" rows={4} />
            </>
          )}
          <input
            // onClick={() => {
            //   console.log("clicked");
            // }}
            // disabled={!canSubmit}
            // className={clsx("p-4 border-2", {
            //   "opacity-50": !canSubmit,
            // })}
            type="submit"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ProfileForm;
