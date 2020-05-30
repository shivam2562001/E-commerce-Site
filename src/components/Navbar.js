import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';
import logo from '../shopping.png';
import styled from "styled-components";
import {ButtonContainer} from './Button';
export default class Navbar extends Component {
  render() {
    return (
        <NavWrapper className="navbar navbar-expand-sm navbar-dark ">
          <Link to="/">
            <img
              src={logo}
              alt="store"
              className="navbar-brand"
              width="70"
              height="70"
            />
          </Link>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item mr-5">
              <Link to="/" className="nav-link">
                Products
              </Link>
            </li>
          </ul>
          <Link to="/cart" className="ml-auto">
            <ButtonContainer>
              <span className="mr-2">
                <i className="fas fa-cart-plus" />
                My Cart
              </span>
            </ButtonContainer>
          </Link>
        </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem ;
    text-transform: capitalize ;
  }
`;