import { CheckCheckIcon } from "lucide-react";
import React from "react";

const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-green-500 bg-green-500/30 text-sm p-2">
      <CheckCheckIcon /> <p className="font-semibold font-xs">{message}</p>
    </div>
  );
};

export default FormSuccess;
