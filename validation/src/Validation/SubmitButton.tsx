import React from "react";
import { FormRules, validateForm, Validation } from "./Validation";
import { Errors } from "./Errors";

interface IProps {
  onSubmit: () => void;
  formFields: Validation<unknown>[];
  submitRules?: FormRules;
}

export const SubmitButton = ({
  onSubmit,
  formFields,
  submitRules = {},
}: IProps) => {
  const submitErrors = validateForm(submitRules);
  const hasSubmitErrors = submitErrors.length > 0;
  const hasFormErrors = formFields.flatMap((v) => v.errors).length > 0;

  return (
    <>
      <button disabled={hasSubmitErrors || hasFormErrors} onClick={onSubmit}>
        Submit, playa 🤙
      </button>
      {hasSubmitErrors && !hasFormErrors && <Errors errors={submitErrors} />}
    </>
  );
};
