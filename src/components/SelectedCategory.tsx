"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "./ui/card";
import Image from "next/image";
import { categoryItems } from "@/lib/CategoryItems";
import SubmitButton from "@/app/create/[id]/_components/SubmitButton";
import { useForm } from "react-hook-form";
import { createCategory } from "@/Action/action";

const SelectedCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    // console.log(selectedCategory);
    try {
      await createCategory(selectedCategory);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap justify-center items-center flex-shrink-0 gap-5 mt-10 mx-auto mb-30">
          {categoryItems.map((item) => {
            return (
              <div key={item.id} className="cursor-pointer">
                <Card
                  className={
                    selectedCategory === item.name
                      ? "border-primary border-2"
                      : ""
                  }
                  onClick={() => setSelectedCategory(item.name)}
                >
                  <CardHeader>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      height={32}
                      priority
                      quality={95}
                      width={32}
                    />
                    <p>{item.title}</p>
                  </CardHeader>
                </Card>
              </div>
            );
          })}
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default SelectedCategory;
