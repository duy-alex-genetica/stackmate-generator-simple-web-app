import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Container from "@/components/ui/container";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useQueryState } from "nuqs";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

function DateFiltersWidget(): JSX.Element {
  const [isDateFromDrawerOpen, setIsDateFromDrawerOpen] = useState(false)
  const [isDateToDrawerOpen, setIsDateToDrawerOpen] = useState(false)

  const [from, setFrom] = useQueryState("from", {
    throttleMs: 200,
  });

  const [to, setTo] = useQueryState("to", {
    defaultValue: "",
    throttleMs: 500,
  });

  const calendarClassNames = {
    nav_button_previous: "absolute left-1 square-8",
    nav_button_next: "absolute right-1 square-8",
    months: "flex flex-col sm:flex-row space-y-1 sm:space-x-4 sm:space-y-0",
    month: "space-y-2",
    caption_label: "text-base font-medium",
    head_row: "flex justify-center items-center",
    head_cell: "w-[42px] h-[42px] grid place-items-center text-base font-medium",
    row: "flex justify-center items-center w-full",
    cell: "text-base text-dim-10 font-medium",
    day: "w-[40px] h-[40px] rounded-sm",
    day_today: "bg-primary-4/10 text-primary-4",
    day_selected: "bg-primary-4 text-white",
  }

  const calendarComponents: any = {
    IconLeft: ({ className, ...props }: any) => (
      <ChevronLeftIcon className={cn("h-5 w-5", className)} {...props} />
    ),
    IconRight: ({ className, ...props }: any) => (
      <ChevronRightIcon className={cn("h-5 w-5", className)} {...props} />
    ),
  }

  return (
    <section>
      <Container className="grid-cols-max gap-5">
        <Button
          className="block h-auto px-4 py-2 bg-white text-left !rounded-1"
          variant="link"
          onClick={() => {
            setIsDateFromDrawerOpen(true);
          }}
        >
          <div className="font-bold">From</div>
          <div>26/01/2025</div>
        </Button>

        <Button
          className="block h-auto px-4 py-2 bg-white text-left !rounded-1"
          variant="link"
          onClick={() => {
            setIsDateToDrawerOpen(true);
          }}
        >
          <div className="font-bold">To</div>
          <div>26/01/2025</div>
        </Button>
      </Container>

      <Drawer open={isDateFromDrawerOpen} onOpenChange={setIsDateFromDrawerOpen} direction="bottom">
        <DrawerContent className="bg-white border-none">
          <DrawerHeader className="header grid-cols-max justify-between items-center">
            <DrawerTitle className="title">
              Pick from date
            </DrawerTitle>
            <DrawerClose>
              <IoClose className="square-5"/>
            </DrawerClose>
          </DrawerHeader>

          <Calendar
            classNames={calendarClassNames}
            mode="single"
            selected={new Date(from ?? Date.now())}
            onSelect={async (date) => {
              await setFrom((date ?? new Date()).toISOString());
            }}
            components={calendarComponents}
          />
        </DrawerContent>
      </Drawer>

      <Drawer open={isDateToDrawerOpen} onOpenChange={setIsDateToDrawerOpen} direction="bottom">
        <DrawerContent className="bg-white border-none">
          <DrawerHeader className="header grid-cols-max justify-between items-center">
            <DrawerTitle className="title">
              Pick to date
            </DrawerTitle>
            <DrawerClose>
              <IoClose className="square-5"/>
            </DrawerClose>
          </DrawerHeader>

          <Calendar
            classNames={calendarClassNames}
            mode="single"
            selected={new Date(to ?? Date.now())}
            onSelect={async (date) => {
              await setTo((date ?? new Date()).toISOString());
            }}
            components={calendarComponents}
          />
        </DrawerContent>
      </Drawer>
    </section>
  )
}

export default DateFiltersWidget;
