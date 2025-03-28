import { BsExclamationCircleFill } from "react-icons/bs";

import React from "react";

const FormError = ({ message }: { message?: string }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-red-500 bg-red-500/30 text-sm p-2 ">
      <BsExclamationCircleFill />{" "}
      <p className="font-semibold font-xs">{message}</p>
    </div>
  );
};

export default FormError;
