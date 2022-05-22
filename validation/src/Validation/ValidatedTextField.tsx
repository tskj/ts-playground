import { useState } from "react";
import { Validation } from "./Validation";
import React from "react";
import { Errors } from "./Errors";

interface IProps {
  value: Validation<string>;
  onChange: (value: string) => void;
}

export const ValidatedTextField = ({
  value: { value, errors },
  onChange,
}: IProps) => {
  const [hasVisited, setHasVisited] = useState<boolean>(false);
  return (
    <>
      <input
        value={value}
        onBlur={() => setHasVisited(true)}
        onChange={(e) => onChange(e.target.value)}
      />
      {hasVisited && <Errors errors={errors} />}
    </>
  );
};
