"use client";

import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import * as React from "react";
import { cn } from "@/lib/cn";
import { Icons } from "./icons";
import type { NavItem } from "./main-nav";
import type { NestedNavItem } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

export function MobileDropdown(props: {
  items: { main: NavItem[]; docs: NestedNavItem[] };
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hamburger focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu className={cn("h-6 w-6", isOpen && "open")} />
          <span className="sr-only">Menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-40 mt-2 h-[calc(100vh-4.0625rem)] w-screen bg-background animate-none rounded-none border-none transition-transform md:hidden">
        <ScrollArea className="pb-8">
          {props.items.docs.map((item) => (
            <div key={item.title} className="flex flex-col space-y-3 pt-6">
              <h4 className="font-bold">{item.title}</h4>
              {item?.items?.length &&
                item.items.map((item) => (
                  <PopoverClose asChild key={item.href}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex py-1 text-base font-medium text-muted-foreground transition-colors hover:text-primary",
                          item.href === pathname && "text-foreground",
                        )}
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noreferrer" : ""}
                      >
                        {item.title}
                        {item.label && (
                          <span className="ml-2 rounded-md bg-teal-100 px-1.5 py-0.5 text-xs no-underline group-hover:no-underline dark:bg-teal-600">
                            {item.label}
                          </span>
                        )}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </PopoverClose>
                ))}
            </div>
          ))}
        </ScrollArea>
        <div className="border-t pt-4">
          <ThemeToggle />
        </div>
      </PopoverContent>
    </Popover>
  );
}
