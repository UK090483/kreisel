import { FormError } from "./parts/FormError";
import { FormLabel } from "./parts/FormLabel";
import { InputWarp } from "./parts/InputWrap";
import { formClasses } from "./style";
import { Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useFormContext, useController } from "react-hook-form";
import clsx from "clsx";

type DropdownItem = { title: string; value: string };
interface DropdownProps {
  items: DropdownItem[];
  value?: string | string[];
  onChange: (value: DropdownItem[]) => void;

  name: string;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { items = [], onChange, value, name } = props;

  const isMulti = Array.isArray(value);

  const active = isMulti
    ? value.length > 0
      ? items.filter((i) => value.includes(i.value))
      : [{ value: "placeHolder", title: "bitte wählen" }]
    : items.find((i) => i.value === value);

  const handleChange = (value: DropdownItem[]) => {
    if (value && Array.isArray(value)) {
      onChange(value.filter((i) => i.value != "placeHolder"));
    }
  };

  return (
    <Listbox
      value={active || []}
      onChange={handleChange}
      multiple
      data-test-id={`input_${name}`}
    >
      <div className="relative mt-1">
        <Listbox.Button
          id={name}
          role="combobox"
          className={clsx(
            formClasses.border,
            formClasses.bg,
            "relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
          )}
        >
          <ul className="block truncate">
            {Array.isArray(active)
              ? active.map((i) => <p key={i.value}>{i.title}</p>)
              : active
              ? active?.title
              : "bitte wählen"}
          </ul>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-base">
            {items.map((item, itemIdx) => (
              <Listbox.Option
                key={itemIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.title}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

type DropdownInputProps = {
  name: string;
  label: string;
} & Pick<DropdownProps, "items">;

export const DropdownInput: React.FC<DropdownInputProps> = (props) => {
  const { name, label, items } = props;

  const { field } = useController({
    name,
  });
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const handleChange = (value: DropdownItem | DropdownItem[]) => {
    const isArray = Array.isArray(value);
    if (isArray) {
      field.onChange(value.map((i) => i.value));
    }
    if (!isArray) {
      field.onChange([value.value]);
    }
  };

  useEffect(() => {
    register(name);
  }, [register, name]);

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <InputWarp disabled={isSubmitting}>
      <FormLabel name={name} label={label} />
      <Dropdown
        name={name}
        items={items}
        value={field.value}
        onChange={handleChange}
      />
      <FormError errorMessage={errorMessage} />
    </InputWarp>
  );
};
