import clsx from "clsx";
import { Profile } from "@lib/Profile/profileQuery";

import * as React from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext,
} from "react-hook-form";

interface IProfileFormProps {
  profile: Profile;
}

const ProfileForm: React.FunctionComponent<IProfileFormProps> = (props) => {
  const { profile } = props;

  const methods = useForm<Profile>({ defaultValues: profile });
  const { handleSubmit } = methods;
  const {
    formState: { isDirty, isValid, isSubmitting },
    reset,
  } = methods;

  const canSubmit = isDirty && isValid && !isSubmitting;

  const allowProfile = profile.allowProfile;

  const onSubmit: SubmitHandler<Profile> = async (data) => {
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
    <div className="w-full px-5 max-w-2xl mx-auto">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid  md:grid-cols-3 gap-4">
            <Input name="firstName" label="Vorname" />
            <Input name="name" label="Name" />
            <Input name="email" label="Email" type="email" />
            <Input name="phone" label="Tel" type="tel" />

            {allowProfile && (
              <>
                <Input name="mobile" label="Mobile" type="tel" />
                <Input name="website" label="Website" />
              </>
            )}
          </div>

          {allowProfile && (
            <>
              <Input name="job" label="Job" />
              <Input name="surgery" label="Praxis" />
              <div className="grid md:grid-cols-2 gap-4">
                <Input name="addressSupplement" label="Address Zusatz" />
                <Input name="street" label="Strasse" />
                <Input name="city" label="Ort" />
                <Input name="zipCode" label="Plz" />
              </div>
              <Textarea name="description" label="Description" rows={4} />
            </>
          )}
          <input
            disabled={!canSubmit}
            className={clsx("p-4 border-2", {
              "opacity-50": !canSubmit,
            })}
            type="submit"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ProfileForm;

type InputProps = {
  name: string;
  label: string;
} & JSX.IntrinsicElements["input"];

const Input: React.FC<InputProps> = (props) => {
  const { name, label, className } = props;
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <div
      className={clsx("flex flex-col gap-2 py-2 ", {
        "opacity-25": isSubmitting,
      })}
    >
      <label htmlFor={name}>{label}</label>
      <input
        disabled={isSubmitting}
        type="text"
        {...register(name)}
        {...props}
        className={"rounded-md " + className}
        id={name}
      />
      <p className="text-red">{errors[name] && errors[name]}</p>
    </div>
  );
};

type TextareaProps = {
  name: string;
  label: string;
} & JSX.IntrinsicElements["textarea"];

const Textarea: React.FC<TextareaProps> = (props) => {
  const { name, label, className } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 py-2">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...register(name)}
        {...props}
        className={"rounded-md " + className}
        id={name}
      />
      <p className="text-red">{errors[name] && errors[name]}</p>
    </div>
  );
};
