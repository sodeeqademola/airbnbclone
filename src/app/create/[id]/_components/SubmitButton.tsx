"use client";
import { Button } from "@/components/ui/button";

import { Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <div className="fixed w-[95%] bottom-0 z-10 bg-white border-t p-3 mt-30 mx-auto">
      <div className="flex items-center justify-between mx-auto px-4 lg:px-10 h-full">
        <Button
          className="hover:bg-slate-500 hover:transition-colors bg-slate-700"
          size="default"
        >
          <Link href={"/"}>Cancel</Link>
        </Button>
        <Button size="default" type="submit">
          {pending ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export const AddToFavouriteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <div>
          <Button
            variant="outline"
            size="icon"
            disabled
            className="bg-primary-foreground"
          >
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="icon"
          type="submit"
          className="bg-primary-foreground"
        >
          <Heart className="w-4 h-4" />
        </Button>
      )}
    </>
  );
};
export const DeleteFromFavouriteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <div>
          <Button
            variant="outline"
            size="icon"
            disabled
            className="bg-primary-foreground"
          >
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="icon"
          type="submit"
          className="bg-primary-foreground"
        >
          <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  );
};
