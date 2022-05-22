import { useState } from "react";
import { filterMap } from "./Utils";

export type Validation<T> = {
  value: T;
  errors: string[];
};

export type FieldRules<T> = Record<string, (x: T) => boolean>;
export type FormRules = Record<string, () => boolean>;

export const useValidatedState = <T>(
  initialState: T,
  rules: FieldRules<T>
): [Validation<T>, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialState);
  const errors = validateField(rules, value);

  return [{ value, errors }, setValue];
};

type unit = [];
const unit: unit = [];

export const validateField = <T>(rules: FieldRules<T>, value: T) =>
  filterMap(Object.entries(rules), ([errorMessage, rule]) =>
    !rule(value) ? errorMessage : undefined
  );

export const validateForm = (rules: FormRules) => validateField(rules, unit);
