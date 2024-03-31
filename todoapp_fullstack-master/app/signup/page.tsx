"use client";
import { SignUp } from "@clerk/nextjs";
import { ListTodo } from "lucide-react";
import React from "react";

function page() {
  return (

    <div className="justify-center h-full w-full flex items-center">
      <div className="col-span-8 flex-1 px-16"><SignUp /></div>
      <main className="flex-1 border-r h-full flex flex-col gap-2 items-center justify-center">
        <ListTodo width="500" height="500" className="h-40 w-40" />
        <h1 className="text-8xl font-semibold">ToDo</h1>
        <span className="text-muted-foreground">
          Complete Tasks...
        </span>
      </main>
    </div>

  );
}

export default page;
