import { memberSchema, schema } from "./validation";
import { membershipOptions, degreeOptions } from "./Fields";
import { ImageUploadInput } from "../../components/Inputs/ImageUpload";
import { profileQueryResult } from "lib/Profile/profileQuery";
import Input from "components/Inputs/input2";
import Textarea from "components/Inputs/TextArea";
import { SwitchInput } from "components/Inputs/Switch";
import { DropdownInput } from "components/Inputs/Dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import clsx from "clsx";
import type { AnyObjectSchema } from "yup";

interface IProfileFormProps {
  profile?: Partial<profileQueryResult>;
  allowProfile?: boolean;
}

const ProfileForm: React.FunctionComponent<IProfileFormProps> = (props) => {
  const { profile, allowProfile } = props;

  const methods = useForm<any>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: profile,
    resolver: yupResolver<AnyObjectSchema>(
      allowProfile ? schema : memberSchema
    ),
  });

  if (!profile) return null;

  const { handleSubmit, reset } = methods;

  const _onSubmit: SubmitHandler<Partial<profileQueryResult>> = async (
    data
  ) => {
    const image = data.image;
    delete data.image;
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(data));
    if (image && image.file) {
      formdata.append("image", image.file);
    }
    try {
      await fetch("api/profile", { method: "POST", body: formdata });
      reset(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className="w-full px-5 max-w-3xl mx-auto">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(_onSubmit)}>
          <Input name="title" label="Title" />
          <div className="grid  md:grid-cols-2 gap-4">
            <Input name="firstName" label="Vorname" />
            <Input name="name" label="Name" />
          </div>

          {allowProfile && (
            <>
              <Textarea name="jobDescription" label="Beruf" rows={4} />

              <div className="grid md:grid-cols-2 gap-4">
                <Input name="street" label="Strasse" />
                <Input name="city" label="Ort" />
                <Input name="zipCode" label="PLZ" />
                <Input name="website" label="Website" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input name="phone" label="Tel" type="tel" />
                <Input name="mobile" label="Mobil" type="tel" />
              </div>
              <ImageUploadInput name="image" label="Avatar" />

              <Textarea name="description" label="Beschreibung" rows={4} />
              <DropdownInput
                name="degree"
                label="Abschlüsse"
                items={degreeOptions}
                multiple
              />
              <DropdownInput
                name="membership"
                label="Mitgliedschaft"
                items={membershipOptions}
                multiple
              />

              <SwitchInput name="offersInternship" label="Hospitationsplatz" />
              {/* <Textarea name="education" label="Ausbildung" rows={4} /> */}
            </>
          )}
          <input
            // onClick={() => {
            //   console.log("clicked");
            // }}
            // disabled={!canSubmit}
            className={clsx("p-4 border-2", {
              // "opacity-50": !canSubmit,
            })}
            type="submit"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ProfileForm;
