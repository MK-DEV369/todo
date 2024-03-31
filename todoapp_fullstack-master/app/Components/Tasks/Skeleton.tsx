import React from 'react';
import styled from 'styled-components';

const SkeletonStyled = styled.div`
 font-weight: 800;
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
`;

const Skeleton = () => {
    return (
        <SkeletonStyled>
            Loading...
        </SkeletonStyled>
    );
};

export default Skeleton;