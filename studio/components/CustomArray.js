// /src/CustomObject.js
import React from "react";
import { FormBuilderInput } from "@sanity/form-builder/lib/FormBuilderInput";
import { EditPortal } from "@sanity/form-builder/lib/EditPortal";
import Fieldset from "part:@sanity/components/fieldsets/default";
import { TextInput } from "@sanity/ui";
// Utilities for patching
import { Card, Text, Flex, Button, Stack, Box } from "@sanity/ui";
import {
  DragHandleIcon,
  RemoveIcon,
  TrashIcon,
} from "@sanity/icons/lib/sanity-icons";
import { setIfMissing } from "@sanity/form-builder/PatchEvent";
import { useState } from "react";

const CustomArray = React.forwardRef(function CO(props, ref) {
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

  const [field, setField] = useState(false);
  const types = type.of.reduce((acc, item) => {
    return { ...acc, [item.name]: item };
  }, {});

  return (
    <Fieldset
      legend={type.title} // schema title
      description={type.description} // schema description
    >
      {field && (
        <EditPortal
          id="blll"
          type="dialog"
          onClose={() => {
            setField(false);
          }}
        >
          <FormBuilderInput
            level={level + 1}
            ref={field ? ref : null}
            key={field.name}
            type={field.type}
            value={value && value[field.index]}
            // onChange={(patchEvent) => handleFieldChange(field, patchEvent)}
            path={[field.name]}
            markers={markers}
            focusPath={focusPath}
            readOnly={field.type.readOnly}
            presence={presence}
            onFocus={onFocus}
            onBlur={onBlur}
            compareValue={compareValue}
          />
        </EditPortal>
      )}
      <Card border>
        <Stack padding={2}>
          {value &&
            value.map((i, index) => {
              const field = types[i._type];
              if (!field) return null;
              console.log(field);
              return (
                <Card
                  border
                  padding={2}
                  key={i._key}
                  onClick={() => {
                    setField({ ...field, index });
                  }}
                >
                  <Flex justify="space-between">
                    <Card>
                      <Button
                        mode="bleed"
                        tone="default"
                        icon={<DragHandleIcon />}
                      />
                    </Card>
                    <Card as="button">
                      <Text>{i.label}</Text>
                    </Card>

                    <Button tone="critical" mode="bleed" icon={<TrashIcon />} />
                  </Flex>
                </Card>
              );
            })}
        </Stack>
      </Card>
    </Fieldset>
  );
});

export default CustomArray;
