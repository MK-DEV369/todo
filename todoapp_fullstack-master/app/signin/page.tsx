"use client";
import { SignIn } from "@clerk/nextjs";
import { ListTodo } from "lucide-react";
import React from "react";

export default function page() {
  return (
    /**<div className="h-full w-full flex flex-row m-10 justify-evenly">      

      <div className="h-full w-full flex flex-col flex-1 border-r gap-4 items-center justify-center">
        <ListTodo width="150" height="150" />
        
        <h1 className="text-8xl font-semibold">ToDo</h1>
        <h3>Complete Tasks...</h3>
      </div>

      <div className=" justify-between p-10 content-center"><SignIn /></div>

    </div>**/
    
    <div className="h-full w-full relative align-middle items-center justify-items-center justify-center m-auto p-auto"> <SignIn /></div>
  ); 
  
}
