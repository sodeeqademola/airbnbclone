import ListingCard from "@/components/ListingCard";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user.id;
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      favourite: {
        where: {
          userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!user) {
    return redirect("/");
  }
  return (
    <div className="container mx-auto lg:px-10 mt-10">
      <h1 className="text-3xl font-semibold tracking-tight">Your Homes</h1>
      {data.length === 0 ? (
        <div className="flex min-h-[400px] flex-col justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10 w-[90%] mx-auto">
          <h2 className="mt-6 font-semibold text-xl">
            Sorry you dont have any home listed
          </h2>
          <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
            Please list a home on airbnb so that you can see it right here
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              image={item.photo as string}
              homeId={item.id}
              price={item.price as number}
              description={item.description as string}
              location={item.country as string}
              userId={user.id}
              favouriteId={item.favourite[0]?.id as string}
              isInfavourite={item.favourite.length > 0 ? true : false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
