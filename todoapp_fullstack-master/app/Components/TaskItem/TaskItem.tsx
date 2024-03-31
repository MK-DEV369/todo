"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";
import Modal from "../Modals/Modal";
import CreateContent from "../Modals/CreateContent";
import { DndContext } from "@dnd-kit/core";
import Droppable from "../DnD/Droppable";
import Draggable from "../DnD/Draggable";

interface Props {
  id: string;
  title: string;
  description: string;
  date: string;
  state: string;
}


export default function TaskItem({ id, title, description, date, state }: Props) {
  const { theme, deleteTask, updateTask, openModal, modal } = useGlobalState();
  const handleStateChange = (newState: string) => {
    const task = {
      id,
      state: newState,
    };

    updateTask(task);
  };
  function truncateDescription(description: any) {
    const maxLength = 50;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  return (
    

      <TaskItemStyled theme={theme} key={theme.name}>
        {modal && <Modal content={<CreateContent />} />}
        
            <h1>{title}</h1>
            <p>{truncateDescription(description)}</p>
            <p className="date">{formatDate(date)}</p>
            <div className="task-footer">
              <select
                value={state}
                onChange={(e) => handleStateChange(e.target.value)}
              >
                <option className="incomplete" value="incomplete">Incomplete</option>
                <option className="inprogress" value="inprogress">In-Progress</option>
                <option className="completed" value="completed">Completed</option>
              </select>
              <button className="task-footer-button" onClick={() => { updateTask(id) }}><Pencil /></button>
              <button className="task-footer-button" onClick={() => { deleteTask(id) }}><Trash2 /></button>
            </div>
          
      </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colorBg};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  color: ${(props) => props.theme.iconColor};
  height: 15rem;
  justify-content: space-evenly;

  .date {
    margin-top: auto;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    position: relative;
    font-weight: 500;    
    color: ${(props) => props.theme.iconColor};
    background-color: ${(props) => props.theme.colorBg};
    z-index: auto;

    select {
      width: 100%;
      padding: 1rem;
      resize: none;
      background-color: ${(props) => props.theme.colorBg3};
      color: ${(props) => props.theme.iconColor};
      border-radius: 0.5rem;
      
      option {
        padding: 0.4rem 1rem;
        border-radius: 30px;
      }
    }

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.iconColor};
      }

      .task-footer-button {
      border: 2px solid ${(props) => props.theme.borderColor};
      border-radius: 0.75rem;
      bottom: 0;
      left: 0;
      width: fit-content;
      height: fit-content;
      transition: all 0.55s linear;
      opacity: 0.5;

      &:hover {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
        transform: scale(1.1);
      }
    }
    }

    .edit {
      margin-left: auto;
    }
    
  }
`;
