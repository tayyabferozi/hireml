import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footer">
      <div className="footer-top">
        <div className="logo">
          <img src="/assets/vectors/logo.svg" alt="logo" />
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/pricing">Price</Link>
          <Link to="/support">Support</Link>
          <Link to="/login">Login</Link>
          <Link to="/blogs">Blog</Link>
        </div>
        <div className="reach-us">
          <a href="mailto:information@info.com">information@info.com</a>
          <div>1901 Hardsville Plaza Shilo, Hawaii 12412</div>
        </div>
      </div>
      <div className="footer-bottom">Copyright © 2022 Hireml</div>
    </div>
  );
};

export default Footer;
