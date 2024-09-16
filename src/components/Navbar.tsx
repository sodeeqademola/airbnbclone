"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";

import { Rows3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchModalComponents from "./SearchComponents";

const Navbar = () => {
  // get user
  const { user } = useKindeBrowserClient();

  return (
    <div>
      <div className="border-b px-3 py-1 flex justify-between items-center ">
        <Link href={"/"}>
          <Image
            src={"/airbnblogo.png"}
            alt="airbnblogo"
            priority
            quality={95}
            width={70}
            height={70}
          />
        </Link>
        {/* <div className="border rounded-full p-2">
          <h1 className="text-small">Hello from the search</h1>
        </div> */}
        <SearchModalComponents />
        <div className="flex items start justify-center gap-1 p-1.5 rounded-full border ">
          <Rows3 size={20} />
          <Dropdown>
            <DropdownTrigger>
              <Image
                src={user?.picture ?? "/avatar.png"}
                alt="avatar"
                width={20}
                height={20}
                className="cursor-pointer rounded-full"
              />
            </DropdownTrigger>

            {user ? (
              <DropdownMenu>
                <DropdownSection showDivider>
                  <DropdownItem>
                    <Link href={`/create/${user.id}/structure`}>
                      {" "}
                      <button type="submit">Airbnb your Home</button>{" "}
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href={"/my-homes"}> My Listings</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href={"/favourites"}> My Favourites</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href={"/reservations"}> My Reservations</Link>
                  </DropdownItem>
                </DropdownSection>
                <DropdownItem>
                  <LogoutLink> Logout</LogoutLink>
                </DropdownItem>
              </DropdownMenu>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownItem>
                    <RegisterLink> Register</RegisterLink>
                  </DropdownItem>
                  <DropdownItem>
                    <LoginLink>Login</LoginLink>
                  </DropdownItem>
                </DropdownMenu>
              </>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
