import styled from 'styled-components';

export const ButtonContainer = styled.button`
         text-transform:  uppercase;
         font-size: 1.2rem;
         background: transparent;
         border: 0.05rem solid var(--lightBlue);
         border-color: ${(props) =>
           props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
         color: ${(prop) =>
           prop.cart ? "var(--mainYellow)" : " var(--mainWhite)"};
         border-radius: 0.5rem;
         padding: 0.2rem 0.5rem;
         cursor: pointer;
         margin: 0.2rem 0.7rem 0.2rem 0;
         transition: all 0.5s ease-in-out;
         &:hover {
           background: ${(prop) =>
             prop.cart ? "var(--mainYellow)" : " var(--mainWhite)"};
           color: ${(prop) =>
             prop.cart ? "var(--mainRed)" : " var(--mainBlue)"};
         }
         &:focus {
           outline: none;
         }
       `;