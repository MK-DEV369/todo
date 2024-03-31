"use client";
import styled from "styled-components";
import { useContext, useState } from "react";
import { GlobalContext, useGlobalState } from "./context/globalProvider";
import Tasks from "./Components/Tasks/Tasks";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./Components/DnD/Droppable";
import Draggable from "./Components/DnD/Draggable";

export default function Home() {
  const { tasks } = useGlobalState();
  const { theme } = useContext(GlobalContext);

  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
      if (tasks.id.state) {
        console.log(tasks.id.state)
      } 
    }
  }

  return (
    <TaskPage theme={theme} key={theme.name}>
      
      <Tasks title="All Tasks" tasks={tasks} />

      <DndContext onDragEnd={handleDragEnd}>
        <div className="RightBar">
          <div>
            <h1 className="task-title">Incomplete Tasks</h1>
            <Droppable>
              {isDropped ? draggableMarkup : <p className="create-task">Drop Here</p>}              
            </Droppable>
          </div>
          <div>
            <h1 className="task-title">In-Progress Tasks</h1>
            <Droppable>
            {isDropped ? draggableMarkup : <p className="create-task">Drop Here</p>}              
            </Droppable>
          </div>
          <div>
            <h1 className="task-title">Completed Tasks</h1>
            <Droppable>
            {isDropped ? draggableMarkup : <p className="create-task">Drop Here</p>}              
            </Droppable>
          </div>
        </div>
      </DndContext>
    </TaskPage>
  );
}

const TaskPage = styled.main`
  display: flex;
  flex-direction: row;
  
  
  .RightBar {
   position: fixed;
   right: 0;
   top: 0;
   bottom: 0;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   width: 20rem;
   margin: 2rem;
   padding: 2rem;
   background-color: ${(props) => props.theme.colorBg2};
   border: 2px solid ${(props) => props.theme.borderColor2};
   border-radius: 1rem;   
   color: ${(props) => props.theme.iconColor};
   z-index: -1;
   
   .task-title {
      line-height: 1.75rem;
      margin-bottom: 0.5rem;
      font-size: clamp(1.5rem, 2vw, 1.5rem);
      font-weight: 800;
      position: relative;
      
      &::after {
        content: "";
        position: absolute;
        bottom: -0.6rem;
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
    height: 9rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;
    
    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }}
  
`;

