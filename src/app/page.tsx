import ListingCard from "@/components/ListingCard";
import MapFilterItems from "@/components/MapFilterItems";
import NoItems from "@/components/NoItems";
import Skeleton from "@/components/Skeleton";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";

type searchParamsProps = {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
  };
};

export default async function Home({ searchParams }: searchParamsProps) {
  //getListingCards Data
  const filter = searchParams?.filter;
  // console.log(filter);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user.id;

  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: filter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      country: true,
      description: true,
      favourite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      {data.length === 0 ? (
        <NoItems />
      ) : (
        <Suspense key={filter} fallback={<Skeleton />}>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {data.map((item) => {
              return (
                <ListingCard
                  key={item.id}
                  image={item.photo as string}
                  description={item.description as string}
                  location={item.country as string}
                  price={item.price as number}
                  userId={userId as string}
                  isInfavourite={item.favourite.length > 0 ? true : false}
                  favouriteId={item.favourite[0]?.id}
                  homeId={item.id as string}
                />
              );
            })}
          </div>
        </Suspense>
      )}
    </div>
  );
}
