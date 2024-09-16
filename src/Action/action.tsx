"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createCategory = async (selectedCategory: string | undefined) => {
  // console.log(selectedCategory);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  //confirm user from dB
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (isUser) {
    const home = await prisma.home.create({
      data: {
        categoryName: selectedCategory,
        addedCategory: true,
      },
    });
    return redirect(`/create/${home.id}/description`);
  }
};

//upload description

export const createDescription = async (
  value: {
    description: string;
    imageUrl: string;
    price: number;
    title: string;
    homeId: string;
  },
  guestAmount: number,
  roomsAmount: number,
  bathroomAmount: number
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const { title, description, imageUrl, price, homeId } = value;

  if (!user.id && !homeId) {
    return redirect("/");
  }
  const createDescription = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title,
      description,
      addedDescription: true,
      bathroom: String(bathroomAmount),
      bedrooms: String(roomsAmount),
      guests: String(guestAmount),
      photo: imageUrl,
      price,
    },
  });
  return redirect(`/create/${homeId}/address`);
};

export const createLocation = async (locationValue: string, id: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user.id) {
    return redirect("/");
  }

  const validUser = await prisma.home.findUnique({
    where: {
      id,
    },
  });
  if (
    validUser?.addedDescription === true &&
    validUser.addedCategory === true
  ) {
    const home = await prisma.home.update({
      where: {
        id,
      },
      data: {
        addedLocation: true,
        country: locationValue,
      },
    });
  } else {
    return redirect("/");
  }
};

export const AddToFavourite = async (userId: string, homeId: string) => {
  // console.log(userId, homeId);
  const data = await prisma.favourite.create({
    data: {
      homeId,
      userId,
    },
  });
  revalidatePath("/");
};

export const DeleteFromFavourite = async (
  userId: string,
  favouriteId: string
) => {
  // console.log(userId, homeId, favouriteId);

  const data = await prisma.favourite.delete({
    where: {
      id: favouriteId,
      userId,
    },
  });
  revalidatePath("/");
};

export const createReservation = async (
  homeId: string,
  userId: string,
  startDate: string,
  endDate: string
) => {
  // console.log(homeId, userId, endDate, startDate);
  const data = await prisma.reservation.create({
    data: {
      userId,
      homeId,
      endDate,
      startDate,
    },
  });
  return redirect("/");
};
