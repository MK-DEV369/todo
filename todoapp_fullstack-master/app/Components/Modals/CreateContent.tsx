import { useGlobalState } from "@/app/context/globalProvider";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { Plus } from "lucide-react";

function CreateContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [state, setState] = useState("incomplete");

  const { theme, allTasks, closeModal } = useGlobalState();

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "state":
        setState(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      state,
    };

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      }

      if (!data.error) {
        toast.success("Task created successfully.");
        allTasks();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };
  
  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme} key={theme.name}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="Task Name"
          color={theme.iconColor}
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Task Description</label>
        <textarea
          value={description}
          onChange={handleChange("description")}
          name="description"
          id="description"
          rows={4}
          placeholder="Task Description"
          color={theme.iconColor}
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Start Date</label>
        <input
          value={date}
          onChange={handleChange("date")}
          type="date"
          name="date"
          id="date"
          color={theme.iconColor}
        />
      </div>
      <div className="input-control">
        <label htmlFor="state">Task State</label>
        <select
          value={state}
          onChange={handleChange("state")}
          name="state"
          id="state"
        >
          <option value="incomplete">Incomplete</option>
          <option value="inprogress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Create Task"
          icon={<Plus />}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"gray"}
        />
      </div>
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.iconColor};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;
    
    color: ${(props) => props.theme.iconColor};
    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.iconColor};
      }
    }

    select {
      width: 100%;
      padding: 1rem;
      resize: none;
      background-color: ${(props) => props.theme.colorBg3};
      color: ${(props) => props.theme.iconColor};
      border-radius: 0.5rem;
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorBg3};
      color: ${(props) => props.theme.iconColor};
      border-radius: 0.5rem;
    }
  }

   
  .submit-btn button {
    transition: all 0.35s ease-in-out;
    display: flex;
    justify-content: flex-end;
    i {
      color: ${(props) => props.theme.iconColor};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.iconColor} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent;
