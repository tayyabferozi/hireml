import React from "react";
import { Link, NavLink } from "react-router-dom";

import Button from "../../../components/Button";
import Section from "../../../components/Section";

const Navbar = () => {
  return (
    <Section id="navbar">
      <div className="navbar-main">
        <Link to="/" className="logo">
          <img src="/assets/vectors/logo.svg" alt="logo" />
        </Link>

        <div className="links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pricing">Price</NavLink>
          <NavLink to="/support">Support</NavLink>
          <NavLink to="/blogs">Blog</NavLink>
          <Button primary to="/login">
            Login
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Navbar;
