import React from "react";

interface IProps {
  errors: string[];
}

export const Errors = ({ errors }: IProps) => {
  return (
    <ul>
      {errors.map((e) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  );
};
