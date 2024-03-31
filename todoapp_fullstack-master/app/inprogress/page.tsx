"use client";
import { GlobalContext, useGlobalState } from "../context/globalProvider";
import Tasks from "../Components/Tasks/Tasks";
import styled from "styled-components";
import { useContext } from "react";

export default function page() {
  const { inprogressTasks } = useGlobalState();  
  const { theme} = useContext(GlobalContext);

  return (
  <TaskPage theme={theme} key={theme.name}>
  <Tasks title="All Tasks" tasks={inprogressTasks} />

  <div className="RightBar">
    <div >
      <h1 className="task-title">Incomplete Tasks</h1>
      <p className="create-task">Drop Here</p>
    </div>
    <div >
      <h1 className="task-title">Completed Tasks</h1>
      <p className="create-task">Drop Here</p>
    </div>
  </div>
</TaskPage>
  );
}

const TaskPage = styled.main`
display: flex;

.RightBar {
 position: fixed;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 flex-direction: column;
 justify-content: space-evenly;
 width: 20rem;
 margin: 2rem;
 padding: 2rem;
 background-color: ${(props) => props.theme.colorBg2};
 border: 2px solid ${(props) => props.theme.borderColor2};
 border-radius: 1rem;   
 color: ${(props) => props.theme.iconColor};
 z-index: -1;
 
 .task-title {
    font-size: 1.5rem;
    line-height: 1.75rem;
    margin-bottom: 0.5rem;
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
