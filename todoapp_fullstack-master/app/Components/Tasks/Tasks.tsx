"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React, { Suspense } from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import Modal from "../Modals/Modal";
import { Plus } from "lucide-react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "../DnD/Droppable";
import Draggable from "../DnD/Draggable";
import Skeleton from "./Skeleton";

interface Props {
  title: string;
  tasks: any[];
}


export default function Tasks({ title, tasks }: Props) {
  const { theme, openModal, modal } = useGlobalState();

  return (
    <DndContext>
      <TaskStyled theme={theme} key={theme.name}>
        {modal && <Modal content={<CreateContent />} />}
        <h1>{title}</h1>

        <div className="tasks grid">
          <Suspense fallback={<Skeleton />}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                state={task.state}
                id={task.id}
              />
            ))}
            </Suspense>
          <button className="create-task" onClick={openModal}>
            <Plus />
            Add New Task
          </button>
        </div>

      </TaskStyled>
    </DndContext>
  );
}

const TaskStyled = styled.main`
  position: fixed;
  top: 0;
  bottom: 0;
  margin: 2rem;
  padding: 2rem 2rem;
  width: 52%; //Change Required Here
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  color: ${(props) => props.theme.iconColor};
  border-radius: 1rem;
  margin-left: 22rem; //Change Required Here
  
  .tasks {
    margin: 2rem 0;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 505px;
    scrollbar-width: none;
    flex-wrap: wrap;
  }
  
  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 15rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

