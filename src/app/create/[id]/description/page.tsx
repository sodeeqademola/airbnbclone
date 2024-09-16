import React from "react";
import DescriptionForm from "../_components/DescriptionForm";

const page = () => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tighter transition-colors">
          Please describe your home as good as you can!
        </h2>
      </div>
      <DescriptionForm />
    </>
  );
};

export default page;
