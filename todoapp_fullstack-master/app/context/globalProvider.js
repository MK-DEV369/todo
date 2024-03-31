import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
 const { user } = useUser();
 const [selectedTheme, setSelectedTheme] = useState(0);
 const [isLoading, setIsLoading] = useState(false);
 const [modal, setModal] = useState(false);
 const [tasks, setTasks] = useState([]);
 const theme = themes[selectedTheme];

 const toggleTheme = () => {
    setSelectedTheme((prevTheme) => (prevTheme + 1) % themes.length);
 };

 const openModal = () => {
    setModal(true);
 };

 const closeModal = () => {
    setModal(false);
 };

 const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      console.log(data);
      const sorted = data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
 };

 const deleteTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Task deleted");
        allTasks();
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
 };

 const updateTask = async (task) => {
    try {
      const res = await fetch(`/api/tasks`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (res.ok) {
        toast.success("Task updated");
        allTasks();
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
 };


 const completedTasks = tasks.filter((task) => task.state === "completed");
 const inprogressTasks = tasks.filter((task) => task.state === "inprogress");
 const incompleteTasks = tasks.filter((task) => task.state === "incomplete");

 useEffect(() => {
    if (user) allTasks();
 }, [user]);

 return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        inprogressTasks,
        incompleteTasks,
        updateTask,
        modal,
        openModal,
        closeModal,
        allTasks,
        toggleTheme,
      }}
    >
      <GlobalUpdateContext.Provider value={{theme, toggleTheme}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
 );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);