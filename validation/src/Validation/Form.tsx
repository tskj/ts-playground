import React from "react";
import { useValidatedState } from "./Validation";
import { ValidatedTextField } from "./ValidatedTextField";
import { SubmitButton } from "./SubmitButton";

export const Form = () => {
  const [title, setTitle] = useValidatedState("", {
    "For kort": (title) => title.length >= 3,
    "For langt": (title) => title.length <= 10,
  });
  const [comment, setComment] = useValidatedState("Initial comment", {});

  const submitRules = {
    "Hvis tittelen er for kort (ELLER LANG) må du ha kommentar!": () =>
      title.value.length >= 5 || comment.value.length > 0,
  };

  const submit = () => console.log(title.value, comment.value);

  return (
    <>
      <ValidatedTextField value={title} onChange={setTitle} />
      <ValidatedTextField value={comment} onChange={setComment} />
      <SubmitButton
        formFields={[title, comment]}
        submitRules={submitRules}
        onSubmit={submit}
      />
    </>
  );
};
