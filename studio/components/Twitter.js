import React from "react";
import { FormField } from "@sanity/base/components";
import { TextInput } from "@sanity/ui";
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent";

const Twitter = React.forwardRef(function Blu(props, ref) {
  const {
    type,
    value,
    readOnly,
    placeholder,
    markers,
    presence,
    compareValue,
    onFocus,
    onBlur,
    onChange,
  } = props;

  const handleChange = React.useCallback(
    (event) => {
      const inputValue = event.currentTarget.value;

      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()));
    },
    [onChange]
  );

  return (
    <FormField
      description={type.description}
      title={type.title}
      compareValue={compareValue}
      __unstable_markers={markers}
      __unstable_presence={presence}
    >
      <TextInput
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        onChange={handleChange}
      />
    </FormField>
  );
});

export default Twitter;
