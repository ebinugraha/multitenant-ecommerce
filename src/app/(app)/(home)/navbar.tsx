"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface navbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: navbarItemProps) => {
  return (
    <Button
      variant={"outline"}
      asChild
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="h-20 flex border-b justify-between bg-white">
      <Link href={"/"} className="items-center pl-6 flex">
        <span className={cn(poppins.className, "font-semibold text-5xl")}>
          Nugraha Store
        </span>
      </Link>

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <NavbarSidebar open={open} onOpenChance={setOpen} items={navbarItems} />

      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            className="bg-black text-white border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none hover:bg-pink-400 transition-color text-lg"
            variant={"secondary"}
          >
            <Link href={"/admin"}>Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            asChild
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none hover:bg-pink-400 transition-color text-lg"
            variant={"secondary"}
          >
            <Link href={"/sign-in"} prefetch>
              Login
            </Link>
          </Button>
          <Button
            className="bg-black text-white border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none hover:bg-pink-400 transition-color text-lg"
            variant={"secondary"}
          >
            <Link href={"/sign-up"} prefetch>
              Start Selling
            </Link>
          </Button>
        </div>
      )}

      <div className="flex lg:hidden items-center">
        <Button
          variant={"ghost"}
          className="border-transparent"
          onClick={() => setOpen(true)}
        >
          <MenuIcon className="w-9 h-9" size={24!} />
        </Button>
      </div>
    </nav>
  );
};
