import React from "react";

const NoItems = () => {
  return (
    <div className="flex min-h-[400px] flex-col justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10 w-[90%] mx-auto">
      <h2 className="mt-6 font-semibold text-xl">
        Sorry no listing for this category found......
      </h2>
      <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
        Please check other category or create your own listing!
      </p>
    </div>
  );
};

export default NoItems;
