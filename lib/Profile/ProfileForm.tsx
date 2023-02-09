import { memberSchema, schema } from "./validation";
import { membershipOptions, degreeOptions, focusOptions } from "./Fields";
import { ImageUploadInput } from "../../components/Inputs/ImageUpload";
import { profileQueryResult } from "lib/Profile/profileQuery";
import Input from "components/Inputs/input2";
import Textarea from "components/Inputs/TextArea";
import { SwitchInput } from "components/Inputs/Switch";
import { DropdownInput } from "components/Inputs/Dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  FormProvider,
} from "react-hook-form";
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

  const {
    handleSubmit,
    reset,
    formState: { dirtyFields, isValid },
  } = methods;

  const hasDirtyFields = Object.keys(dirtyFields).length > 0;

  const canSubmit = hasDirtyFields && isValid;

  const showAnnouncement =
    !profile.name &&
    !dirtyFields.name &&
    !profile.firstName &&
    !dirtyFields.firstName;

  const _onSubmit: SubmitHandler<Partial<profileQueryResult>> = async (
    data
  ) => {
    const image = data.image;
    delete data.image;

    const formdata = new FormData();
    formdata.append("data", JSON.stringify(data));
    if (image && image.file) {
      formdata.append("image", image.file);
      data.image = { url: image.url };
    }

    try {
      const nextData = await fetch("api/profile", {
        method: "POST",
        body: formdata,
      });

      reset(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const _onSubmitError: SubmitErrorHandler<
    Partial<profileQueryResult>
  > = async (errors) => {};

  return (
    <>
      <div className="w-full px-5 max-w-3xl mx-auto  mb-32">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(_onSubmit, _onSubmitError)}>
            <Input name="title" label="Title" />
            <div className="grid  md:grid-cols-2 gap-4">
              <Input name="firstName" label="Vorname" />
              <Input name="name" label="Name" />
            </div>

            {showAnnouncement && (
              <div id="announcement">
                Um Sie richtig zuordnen zu können und den Zugang zu gewähren ist
                es wichtig dass Sie Ihren vollständigen Namen Angeben
              </div>
            )}
            {allowProfile && (
              <>
                <Textarea name="experience" label="Praxis" rows={4} />

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
                  name="focus"
                  label="Arbeitsschwerpunkte"
                  items={focusOptions}
                />
                <DropdownInput
                  name="degree"
                  label="Abschlüsse"
                  items={degreeOptions}
                />
                <Textarea
                  name="additionalDegree"
                  label="Sonstige Abschlüsse"
                  rows={4}
                />
                <DropdownInput
                  name="membership"
                  label="Mitgliedschaft"
                  items={membershipOptions}
                />
                <SwitchInput
                  name="offersInternship"
                  label="Hospitationsplatz"
                />
              </>
            )}
            <input
              value={"Speichern"}
              // disabled={!canSubmit}
              className={clsx(
                "p-4 border-2 fixed  bottom-8 w-screen max-w-xs mx-auto z-50 ",
                {
                  "opacity-0 ": !canSubmit,
                  "opacity-100 bg-green-500": canSubmit,
                }
              )}
              type="submit"
            />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ProfileForm;
