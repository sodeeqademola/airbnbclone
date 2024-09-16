"use client";
import { AddToFavourite, DeleteFromFavourite } from "@/Action/action";
import { Countries } from "@/app/create/[id]/_components/GetCountries";
import {
  AddToFavouriteButton,
  DeleteFromFavouriteButton,
} from "@/app/create/[id]/_components/SubmitButton";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

interface ListingCardProps {
  image: string;
  description: string;
  location: string;
  price: number;
  userId: string;
  isInfavourite: Boolean;
  favouriteId: string;
  homeId: string;
}

const ListingCard = ({
  description,
  image,
  location,
  price,
  userId,
  favouriteId,
  homeId,
  isInfavourite,
}: ListingCardProps) => {
  const getCountries = Countries();
  const country = getCountries.find((item) => {
    return item.name === location;
  });

  const { handleSubmit } = useForm();

  const onAddFavourite = async () => {
    try {
      await AddToFavourite(userId, homeId);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteFavourite = async () => {
    try {
      await DeleteFromFavourite(userId, favouriteId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="py-3 px-3 relative">
        <Image
          src={image}
          alt={"Image of a house"}
          width={300}
          height={300}
          className="rounded-lg mb-1.5 "
        />
        {userId && (
          <div className="z-10 absolute top-4 right-4">
            {isInfavourite ? (
              <form onSubmit={handleSubmit(onDeleteFavourite)}>
                <DeleteFromFavouriteButton />
              </form>
            ) : (
              <form onSubmit={handleSubmit(onAddFavourite)}>
                <AddToFavouriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/home/${homeId}`}>
        <h3 className="font-medium text-base">{`${country?.flag} ${country?.name} / ${country?.region}`}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p>
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;
