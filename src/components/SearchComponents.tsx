"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Minus, Plus, Search } from "lucide-react";

import { Countries } from "@/app/create/[id]/_components/GetCountries";
import HomeMap from "./HomeMap";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { SubmitButton } from "@/app/create/[id]/_components/SubmitButton";
import { Card, CardHeader } from "@nextui-org/react";

const SearchModalComponents = () => {
  const [step, setStep] = useState(1);
  const getCountries = Countries();
  const [locationValue, setLocationValue] = useState("");
  const SubmitLocalButton = () => {
    if (step === 1) {
      return <Button onClick={() => setStep(step + 1)}>Next</Button>;
    } else if (step === 2) {
      return <SubmitButton />;
    }
  };

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Any Guest</p>
          </div>
          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col">
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Country</DialogTitle>
                <DialogDescription>
                  Please Choose a Country, that you want{" "}
                </DialogDescription>
              </DialogHeader>

              <Select
                required
                onValueChange={(value) => setLocationValue(value)}
                value={locationValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {getCountries.map((item) => (
                      <SelectItem key={item.name} value={item.name}>
                        {`${item.flag} ${item.name}/ ${item.region}`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>{" "}
              </Select>
              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all the info you need</DialogTitle>
                <DialogDescription>
                  Please Choose a Country, that you want{" "}
                </DialogDescription>
              </DialogHeader>
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
            </>
          )}
          <DialogFooter>
            <SubmitLocalButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModalComponents;
