"use client";
import { categoryItems } from "@/lib/CategoryItems";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import React from "react";

const MapFilterItems = () => {
  const params = useSearchParams();
  const searcher = params.get("filter");

  //search
  const search = (filter: string, name: string) => {
    const searchParams = new URLSearchParams({
      ...(filter && { filter: name }),
    });
    return `/?${searchParams.toString()}`;
  };

  //code to be dislayed
  return (
    <div className="flex justify-between items-center mt-5 gap-6 overflow-x-scroll no-scrollbar">
      {categoryItems.map((item, index) => (
        <Link
          href={`${search("filter", item.name)}`}
          key={index}
          className={cn(
            searcher === item.name
              ? "border-b-2 border-black pb-2 flex-shrink-0"
              : "opacity-70 flex-shrink-0",
            "flex flex-col gap-y-3 items-center"
          )}
        >
          <div>
            <Image
              src={item.imageUrl}
              alt={item.name}
              height={25}
              width={25}
              priority
              quality={95}
            />
          </div>
          <p>{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default MapFilterItems;
