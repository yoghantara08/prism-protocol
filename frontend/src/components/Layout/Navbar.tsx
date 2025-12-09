import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import classNames from "classnames";

export const menus = [
  {
    name: "Swap",
    link: "/swap",
  },
  {
    name: "Pools",
    link: "/pools",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-background sticky top-0 z-20 flex h-18 w-full justify-center border-b px-[30px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={"/"}>
            {/* <Image
              src={"/prism-logo.svg"}
              alt="prism"
              width={200}
              height={150}
              className="h-10 w-fit"
            /> */}
            <h1 className="font-mono text-3xl font-semibold">Prism</h1>
          </Link>

          <ul className="flex items-center gap-6 pt-1">
            {menus.map((menu) => (
              <li key={menu.name}>
                <Link
                  href={menu.link}
                  className={classNames(
                    "hover:text-accent-pink/80 text-lg hover:font-semibold",
                    pathname.includes(menu.link)
                      ? "text-accent-pink/80 font-semibold"
                      : "text-muted font-medium",
                  )}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ConnectButton showBalance={false} />
      </div>
    </nav>
  );
};

export default Navbar;
