import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import logo from "../shopping.png";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { ACTIONS, AuthContext } from "../context/authContext";
import { useHistory } from "react-router";
export default function Navbar() {
  const { authState, dispatch } = useContext(AuthContext);
  let history = useHistory();





  const handleLogout =() => {
    localStorage.removeItem("access");
    let payload = {
      isAuthenticated: false,
      token:null,
    };
    dispatch({ type: ACTIONS.LOGOUT, payload });
    history.push("/login");
  };
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
       <div className="nav-div">
        {authState.isAuthenticated ? (
          <>
          <Link to="/wishlist" className="align-navLink ">
            My Wishlist
          </Link>
          <Link to="/orders" className="align-navLink ">
            My Orders
          </Link>
          <div className="align-navLink" onClick={() => handleLogout()}>
          Logout
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/cart" >
        <ButtonContainer>
          <span className="mr-2">
            <i className="fas fa-cart-plus" />
            My Cart
          </span>
        </ButtonContainer>
      </Link></>) : (
          <></>
        )}
      </div>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  display: flex;
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;
