import { Countries } from "@/app/create/[id]/_components/GetCountries";
import CategoryShowCase from "@/components/CategoryShowCase";
import HomeMap from "@/components/HomeMap";
import SelectCalender from "@/components/SelectCalender";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type paramsprops = {
  params: {
    id: string;
  };
};
const page = async ({ params }: paramsprops) => {
  const id = params.id;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await prisma.home.findUnique({
    where: {
      id,
    },
    select: {
      photo: true,
      id: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathroom: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      reservation: {
        where: {
          homeId: id,
        },
      },
      User: {
        select: {
          id: true,
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  const getContries = Countries();
  const Country = getContries.find((item) => {
    return item.name === data?.country;
  });

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Image of Home"
          src={data?.photo as string}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">{`${Country?.flag} ${Country?.name} / ${Country?.region}`}</h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
            {data?.bathroom} Bathrooms
          </div>
          <div className="flex items-center mt-6">
            <Image
              src={user.picture ?? "/avatar.png"}
              alt="profileimage"
              width={44}
              height={44}
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {user.given_name}</h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>
          <Divider className="my-7" />
          <CategoryShowCase categoryName={data?.categoryName as string} />
          <Divider className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Divider className="my-7" />
          <HomeMap locationValue={data?.country as string} />
        </div>

        <SelectCalender
          homeId={data?.id as string}
          userId={user.id as string}
          reservation={data?.reservation}
        />
      </div>
    </div>
  );
};

export default page;
