"use client";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";
import { Button } from "./ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { createReservation } from "@/Action/action";
import toast from "react-hot-toast";
import { eachDayOfInterval } from "date-fns";

type calenderProps = {
  homeId: string;
  userId: string;
  reservation:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
};
const SelectCalender = ({ homeId, userId, reservation }: calenderProps) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    const startDate = state[0].startDate.toISOString();
    const endDate = state[0].endDate.toISOString();
    try {
      // console.log(startDate, endDate);
      await createReservation(homeId, userId, startDate, endDate);
      toast.success(
        `Reservation made for ${startDate
          .split(":")[0]
          .slice(0, 7)} to ${endDate.split(":")[0].slice(0, 7)} sucessfully`
      );
    } catch (error) {
      console.log(error);
    }
  };

  let disableDates: Date[] = [];
  reservation?.forEach((reservationItem) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });
    disableDates = [...disableDates, ...dateRange];
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={state}
        onChange={(item) => setState([item.selection as any])}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disableDates}
      />
      {userId ? (
        <div>
          <Button className="w-full" type="submit">
            Make a Reservation
          </Button>
        </div>
      ) : (
        <Button className="w-full" asChild>
          <Link href={"api/auth/login"}>Make A Reservation</Link>
        </Button>
      )}
    </form>
  );
};

export default SelectCalender;
