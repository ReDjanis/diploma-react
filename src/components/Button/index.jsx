import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 200px;
  height: 42px;
  cursor: pointer;
  color: ${props => props.color || '#d58c51'};
  background-color: ${props => props.bgcolor || 'transparent'};
  border: 1px solid #d58c51;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  &:hover {
    background: ${props => {
    if (props.bgcolor) {
      return '#131313'
    } else {
      return '#d58c51'
    }
  }};
    color: ${props => {
    if (props.color) {
      return '#d58c51'
    } else {
      return '#131313'
    }
  }};
    box-shadow: ${props => {
    if (props.color) {
      return 'inset 0 0 0 3px #d58c51'
    } else {
      return 'inset 0 0 0 5px #131313'
    }
  }};
    
  }
`;

const ButtonStyled = ({ name, ...props }) => {
  return (
    <div>
      <Button {...props}>
        {name}
      </Button>
    </div>
  );
};

export default ButtonStyled;
