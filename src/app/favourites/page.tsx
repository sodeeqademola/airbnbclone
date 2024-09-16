import ListingCard from "@/components/ListingCard";
import NoItems from "@/components/NoItems";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user.id;
  const data = await prisma.favourite.findMany({
    where: {
      userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          favourite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });
  if (!user) {
    return redirect("/");
  }
  return (
    <div>
      <section className="container mx-auto py-5 lg:py:10 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight">
          Your Favourites
        </h2>
        {data.length === 0 ? (
          <NoItems />
        ) : (
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
            {data.map((item) => {
              return (
                <ListingCard
                  key={item.Home?.id}
                  description={item.Home?.description as string}
                  location={item.Home?.country as string}
                  homeId={item.Home?.id as string}
                  image={item.Home?.photo as string}
                  price={item.Home?.price as number}
                  userId={user.id}
                  favouriteId={item.Home?.favourite[0].id as string}
                  isInfavourite={
                    (item.Home?.favourite.length as number) > 0 ? true : false
                  }
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default page;
