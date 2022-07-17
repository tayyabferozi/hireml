import React from "react";
import $ from "jquery";
import { Link, NavLink } from "react-router-dom";

import Button from "../../../components/Button";
import Section from "../../../components/Section";

const Navbar = () => {
  const slideMenu = () => {
    $(".menu-bar").slideToggle();
  };

  return (
    <Section id="navbar">
      <div className="navbar-main">
        <Link to="/" className="logo">
          <img src="/assets/vectors/logo.svg" alt="logo" />
        </Link>

        <div className="menu-bar" style={{ display: "none" }}>
          <img
            onClick={slideMenu}
            src="/assets/vectors/close.svg"
            alt="close"
            className="close"
          />
          <div className="mt-30 mt-575-10 px-15">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/pricing">Price</NavLink>
            <NavLink to="/support">Support</NavLink>
            <NavLink to="/blogs">Blog</NavLink>
            <NavLink to="/login">Login</NavLink>
          </div>
        </div>

        <div className="links">
          <NavLink className="d-none d-md-block" to="/">
            Home
          </NavLink>
          <NavLink className="d-none d-md-block" to="/pricing">
            Price
          </NavLink>
          <NavLink className="d-none d-md-block" to="/support">
            Support
          </NavLink>
          <NavLink className="d-none d-md-block" to="/blogs">
            Blog
          </NavLink>
          <Button primary to="/login">
            Login
          </Button>

          <div className="menu" onClick={slideMenu}>
            <img
              src="/assets/vectors/breadcrumb.svg"
              alt="breadcrumb"
              className="d-block d-md-none"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Navbar;
