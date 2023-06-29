import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
  forwardRef,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import _ from "lodash";
import { Select } from "chakra-react-select";

import { Controller } from "react-hook-form";
import {
  NumberFormatBase,
  NumericFormat,
  PatternFormat,
  usePatternFormat,
} from "react-number-format";

export const FormBox = ({
  id,
  label,
  placeholder = "",
  formControl: { trigger, register, setValue, ...formControl },
  type,
  options,
  unlockEdit = true,
  mask = undefined,
  defaultValue,
  validate,
  required = false,
  inputLeftElement,
  inputRightElement,
  customInputProps,
  inlineForm,
  readOnly = false,
  onChange,
  disabled,
  setMask,
  control,
  colorScheme = "primary",
  ...rest
}) => {
  id = readOnly ? `${id}_readOnly` : id;
  const [newId, idx] = id.split(".");
  const [invalid, setInvalid] = useState(false);
  const errors = { [newId]: formControl.getFieldState(id).error };
  const handleOnChange = (e) => {
    // if (mask) {
    //   setValue(id, mask(e.target.value));
    // } else {
    setValue(id, e.target.value);
    // }
    trigger(id);

    if (_.isFunction(onChange)) {
      onChange(e);
    }
  };

  const chakraStyles = {
    control: (provided, state) => ({
      ...provided,
      shadow: state.isFocused ? "inner" : "md",
      // bg: bg,
      w: "full",
      _focus: {
        boxShadow: state.isFocused
          ? `0 0 0 1px var(--chakra-colors-${colorScheme}-500)`
          : errors[id]
          ? "0 0 0 1px #E53E3E"
          : `var(--chakra-shadows-md})`,
        borderColor: state.isFocused
          ? `${colorScheme}.500`
          : errors[id]
          ? "#E53E3E"
          : "gray.200",
      },
    }),
    container: (provided) => ({
      ...provided,
      w: "full",
    }),
  };

  useEffect(() => {
    if (defaultValue && type === "date") {
      setValue(id, DateTime.fromISO(defaultValue).toFormat("yyyy-MM-dd"));
      trigger(id);
    } else if (defaultValue) {
      setValue(id, defaultValue);
      trigger(id);
    }
  }, [defaultValue, unlockEdit]);

  useEffect(() => {
    if (Array.isArray(errors[newId])) {
      setInvalid(errors[newId][idx]);
    } else {
      setInvalid(errors[newId]);
    }
  }, [errors[newId]]);

  return (
    <FormControl
      display={
        (inlineForm && { base: "block", md: "flex" }) ||
        (type === "hidden" && "none")
      }
      alignItems="center"
      py={{ base: 2, md: 1 }}
      isReadOnly={!unlockEdit}
      onChange={handleOnChange}
      isInvalid={invalid}
      justifyContent="space-between"
      // id={id}
    >
      {label && (
        <FormLabel
          w={inlineForm && { base: "full", md: "50%", lg: "30%" }}
          mb={{ base: 0, md: 2 }}
        >
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {inputLeftElement && (
          <InputLeftElement>{inputLeftElement}</InputLeftElement>
        )}
        {type !== "select" &&
          type !== "textarea" &&
          (mask || type === "number" ? (
            <Input
              as={type === "number" ? NumericFormat : PatternFormat}
              valueIsNumericString
              format={mask}
              mask="_"
              {...register(id, {
                validate: required === false ? null : validate,
                required,
                disabled: readOnly || disabled,
              }).ref}
              {...rest}
            />
          ) : (
            <Input
              variant={inlineForm && "flushed"}
              placeholder={placeholder}
              type={type}
              {...register(id, {
                validate,
                required,
                disabled: readOnly || disabled,
              })}
              {...(customInputProps && customInputProps())}
              {...rest}
            />
          ))}
        {type === "textarea" && (
          <Textarea
            variant={inlineForm && "flushed"}
            placeholder={placeholder}
            type={type}
            {...register(id, { validate, required })}
            {...rest}
          />
        )}
        {type === "select" && (
          <Select
            variant={inlineForm && "flushed"}
            placeholder={placeholder}
            {...register(id, { validate, required })}
            isDisabled={disabled ? true : !unlockEdit}
            defaultValue={defaultValue}
            chakraStyles={chakraStyles}
            loadingMessage={() => "Carregando..."}
            noOptionsMessage={() => "Sem opções"}
            options={options}
            onChange={(e) => {
              if (e === null) {
                formControl.resetField(id);
              } else {
                setValue(id, e.value);
                onChange && onChange(e);
              }
              trigger(id);
            }}
            isSearchable
            isClearable
            {...rest}
            menuPortalTarget={document.body}
            menuPosition={"fixed"}
            styles={{
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            // defaultValue={options.find(
            //   ({ value }) => value === "clj92qxda000o243uf5ymh4d1"
            // )}
          />
        )}
        {/* {type === "select" && !options && (
          <Select
            variant={inlineForm && "flushed"}
            placeholder={placeholder}
            chakraStyles={chakraStyles}
            {...rest}
          >
            <option value="carregando">Carregando...</option>
          </Select>
        )} */}
        {(invalid?.message || inputRightElement) && (
          <InputRightElement
            // w={!inlineForm && invalid?.message ? 230 : 100}
            justifyContent="flex-end"
            w="auto"
            // zIndex="hide"
          >
            {/* {!inlineForm && invalid?.message && (
              <FormErrorMessage
                alignSelf="flex-start"
                pt={2.8}
                pe={type === "select" ? 8 : 4}
              >
                {invalid?.message}
              </FormErrorMessage>
            )} */}
            {inputRightElement && inputRightElement}
          </InputRightElement>
        )}
        {inlineForm && invalid?.message && (
          <FormErrorMessage zIndex="hide">{invalid?.message}</FormErrorMessage>
        )}
      </InputGroup>
      <FormErrorMessage zIndex="hide">{invalid?.message}</FormErrorMessage>
    </FormControl>
  );
};
