"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createDescription } from "@/Action/action";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { SubmitButton } from "./SubmitButton";

const formSchema = z.object({
  title: z.string().min(1, "You should fill in at least one character"),
  description: z.string().min(1, "You should fill in at least one character"),
  price: z.coerce.number(),
  image: z
    .instanceof(File || undefined)
    .refine(
      (file) => file.type.startsWith("image"),
      "The file must be an image"
    )
    .refine(
      (file) => file.size <= 1024 * 1024 * 2,
      "The image must be less than 2MB"
    ),
});

//formschematype
export type formSchemaType = z.infer<typeof formSchema>;

const DescriptionForm = () => {
  const params = useParams();
  const homeId = params.id as string;

  //counters
  const [guestAmount, setGuestAmount] = useState(0);
  const [roomsAmount, setRoomsAmount] = useState(0);
  const [bathroomAmount, setBathroomAmount] = useState(0);

  //couters guest changes
  const guestIncreaseAmount = () => {
    setGuestAmount((prev) => {
      return (prev += 1);
    });
  };

  const guestDecreaseAmount = () => {
    if (guestAmount > 0) {
      setGuestAmount((prev) => {
        return (prev -= 1);
      });
    }
  };

  //counterrooms changes
  const roomsIncreaseAmount = () => {
    setRoomsAmount((prev) => {
      return (prev += 1);
    });
  };

  const roomsDecreaseAmount = () => {
    if (roomsAmount > 0) {
      setRoomsAmount((prev) => {
        return (prev -= 1);
      });
    }
  };
  const bathroomsIncreaseAmoount = () => {
    setBathroomAmount((prev) => {
      return (prev += 1);
    });
  };

  const bathroomsDecreaseAmount = () => {
    if (bathroomAmount > 0) {
      setBathroomAmount((prev) => {
        return (prev -= 1);
      });
    }
  };
  //useform
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  //submit function
  const onSubmit = async (values: formSchemaType) => {
    const { description, image, price, title } = values;
    const getImageUrl = async () => {
      const upload_preset = "airbnbclone";
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", upload_preset);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dpnms1tbz/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.url;
    };

    try {
      //
      const imageUrl: string = await getImageUrl();
      const { description, image, price, title } = values;
      const value = { description, imageUrl, price, title, homeId };
      await createDescription(value, guestAmount, roomsAmount, bathroomAmount);
      toast.success("Descriptions created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-10 flex flex-col gap-y-5 mb-36 w-3/5 mx-auto">
          <div className="flex flex-col gap-y-2">
            <h1>Title</h1>
            <Input
              placeholder="short and simple..."
              type="text"
              className="focus:outline focus:outline-[#f5424e]"
              {...register("title")}
              errorMessage={errors.title?.message}
              isInvalid={!!errors.title}
            />
            <h1>Description</h1>
            <Textarea
              type="text"
              placeholder="Please describe your home"
              {...register("description")}
              errorMessage={errors.description?.message}
              isInvalid={!!errors.description}
            />
            <h1>Price</h1>
            <Input
              placeholder="Price per Night in USD"
              type="number"
              required
              className="focus:outline focus:outline-[#f5424e]"
              min={10}
              {...register("price")}
              errorMessage={errors.price?.message}
              isInvalid={!!errors.price}
            />
            <h1>Image</h1>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <Input
                    type="file"
                    required
                    className="focus:outline focus:outline-[#f5424e]"
                    onChange={(e: any) => onChange(e.target.files[0])}
                    errorMessage={errors.image?.message}
                    isInvalid={!!errors.image}
                  />
                );
              }}
            />

            <Card>
              <CardHeader className="flex flex-col gap-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="underline font-medium">Guests</h3>
                    <p className="text-muted-foreground text-sm">
                      {" "}
                      How many guests do you want ?
                    </p>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={guestDecreaseAmount}
                    >
                      <Minus className="h-4 w-4 text-primary" />
                    </Button>
                    <p className="font-medium text-lg">{guestAmount}</p>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={guestIncreaseAmount}
                    >
                      <Plus className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="underline font-medium">Rooms</h3>
                    <p className="text-muted-foreground text-sm">
                      {" "}
                      How many rooms do you have ?
                    </p>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={roomsDecreaseAmount}
                    >
                      <Minus className="h-4 w-4 text-primary" />
                    </Button>
                    <p className="font-medium text-lg">{roomsAmount}</p>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={roomsIncreaseAmount}
                    >
                      <Plus className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="underline font-medium">Bathrooms</h3>
                    <p className="text-muted-foreground text-sm">
                      {" "}
                      How many bathrooms do you have ?
                    </p>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={bathroomsDecreaseAmount}
                    >
                      <Minus className="h-4 w-4 text-primary" />
                    </Button>
                    <p className="font-medium text-lg">{bathroomAmount}</p>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={bathroomsIncreaseAmoount}
                    >
                      <Plus className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default DescriptionForm;
