"use client";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { Countries } from "./GetCountries";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createLocation } from "@/Action/action";
import toast from "react-hot-toast";
import { SubmitButton } from "./SubmitButton";

const LocationForm = () => {
  const getCountries = Countries();
  const [locationValue, setLocationValue] = useState("");
  const router = useRouter();

  const params = useParams();
  const id = params.id as string;

  //lazyMap
  const LazyMap = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => {
      return <Skeleton className="h-[50vh w-full]" />;
    },
  });

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    try {
      await createLocation(locationValue, id);
      toast.success("Location list created successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-3/5 mx-auto text-black text-2xl font-bold mb-24">
          <div className="mb-5">
            <Select
              label="Select a country"
              className="w-full font-bold text-black text-2xl"
              onChange={(e) => {
                setLocationValue(e.target.value);
              }}
            >
              {getCountries.map((country) => (
                <SelectItem
                  className="font-bold text-black text-2xl"
                  key={country.name}
                  value={country.name}
                >
                  {`${country.flag} ${country.name}/ ${country.region}`}
                </SelectItem>
              ))}
            </Select>
          </div>
          <LazyMap locationValue={locationValue} />
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export default LocationForm;
