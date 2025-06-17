import { cn } from "@/lib/utils";
import React from "react";

export default function Container(props: React.PropsWithChildren<any>) {
  return <div className={cn("container px-4 w-full", props.className)}>{props.children}</div>;
}
