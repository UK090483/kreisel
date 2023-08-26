import { memberSchema, schema } from "./validation";
import { membershipOptions, degreeOptions, focusOptions } from "./Fields";
// import { ImageUploadInput } from "components/Molecules/Inputs/ImageUpload";
import { profileQueryResult } from "lib/Profile/profileQuery";
import Input from "components/Molecules/Inputs/Input";
import Textarea from "components/Molecules/Inputs/TextArea";
import { SwitchInput } from "components/Molecules/Inputs/Switch";
import { DropdownInput } from "components/Molecules/Inputs/Dropdown";
import Button from "components/Atoms/Button/Button";
import { PureKreisel } from "components/Atoms/Kreisel";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";

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

  const [error, setError] = useState(false);

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
    formState: { dirtyFields, isValid, isSubmitting },
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
    try {
      const response = await fetch("api/profile", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const res = await response.json();
        reset(res.data);
      } else {
        setError(true);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(true);
    }
  };

  const _onSubmitError: SubmitErrorHandler<
    Partial<profileQueryResult>
  > = async (errors) => {
    setError(true);
    // eslint-disable-next-line no-console
    console.log(errors);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-5 pb-32">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(_onSubmit, _onSubmitError)}>
            <Input name="title" label="Titel" description="Dr. / Prof etc." />
            <div className="grid gap-4 md:grid-cols-2">
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
                <Input
                  name="practice"
                  label="Praxis"
                  description="Name der Praxis/Firma"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Input name="street" label="Strasse" />
                  <Input name="city" label="Ort" />
                  <Input name="zipCode" label="PLZ" />
                  <Input name="website" label="Website" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input name="phone" label="Tel" type="tel" />
                  <Input name="mobile" label="Mobil" type="tel" />
                </div>
                {/* <ImageUploadInput name="image" label="Avatar" /> */}

                <Textarea name="description" label="Beschreibung" rows={4} />
                <DropdownInput
                  name="focus"
                  label="Arbeitsschwerpunkte"
                  items={focusOptions}
                />
                <Textarea
                  name="focusOther"
                  label="Sonstige Arbeitsschwerpunkte"
                  rows={4}
                />
                <DropdownInput
                  name="degree"
                  label="Abschlüsse"
                  items={degreeOptions}
                  description="Bitte wähle bei den KREISELabschlüssen nur deinen höchsten aus!"
                />

                <DropdownInput
                  name="membership"
                  label="Mitgliedschaft"
                  items={membershipOptions}
                />

                <Textarea
                  name="qualification"
                  label="Grundqualifikation"
                  rows={4}
                />

                <SwitchInput
                  name="offersInternship"
                  label="Hospitationsplatz"
                />
              </>
            )}

            <Button
              type="submit"
              className={clsx(
                "fixed bottom-8 z-50  mx-auto flex w-screen max-w-xs items-center justify-center gap-4",
                {
                  "opacity-0 ": !canSubmit,
                  "bg-green-500 opacity-100": canSubmit,
                }
              )}
            >
              {isSubmitting && (
                <PureKreisel className=" h-4 w-4  animate-spin " />
              )}
              Speichern
            </Button>
          </form>
        </FormProvider>

        {error && (
          <div
            id="errorMessage"
            className=" fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-center bg-red text-white"
          >
            Sorry there was an Error please try an other time.
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileForm;
