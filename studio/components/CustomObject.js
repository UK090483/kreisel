// /src/CustomObject.js
import React from "react";
import { FormBuilderInput } from "@sanity/form-builder/lib/FormBuilderInput";
import Fieldset from "part:@sanity/components/fieldsets/default";
// Utilities for patching
import { Card, Text } from "@sanity/ui";
import { setIfMissing } from "@sanity/form-builder/PatchEvent";

const CustomObject = React.forwardRef(function CO(props, ref) {
  // destructure props for easier use
  const {
    compareValue,
    focusPath,
    markers,
    onBlur,
    onChange,
    onFocus,
    presence,
    type,
    value,
    level,
  } = props;

  const handleFieldChange = React.useCallback(
    (field, fieldPatchEvent) => {
      // fieldPatchEvent is an array of patches
      // Patches look like this:
      /*
            {
                type: "set|unset|setIfMissing",
                path: ["fieldName"], // An array of fields
                value: "Some value" // a value to change to
            }
        */
      onChange(
        fieldPatchEvent
          .prefixAll(field.name)
          .prepend(setIfMissing({ _type: type.name }))
      );
    },
    [onChange]
  );

  console.log(props);

  return (
    <Fieldset
      legend={type.title} // schema title
      description={type.description} // schema description
    >
      {value &&
        value.map((i) => {
          console.log(i);
          return (
            <Card key={i._key}>
              <Text>{i.label}</Text>
            </Card>
          );
        })}
    </Fieldset>
  );
});

export default CustomObject;
