"use client";
import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

function GlobalStyleProvider({ children }: Props) {
  return <GlobalStyles>{children}</GlobalStyles>;
}

const GlobalStyles = styled.div`  
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  transition: all 0.3s ease-in-out;

   .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
`;

export default GlobalStyleProvider;
