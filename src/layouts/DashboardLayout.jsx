import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link, NavLink } from "react-router-dom";

const tabsData = [
  {
    icon: "/assets/vectors/nav-tab-1.svg",
    link: "/upcoming-interview",
    title: "Upcoming Interview",
  },
  {
    icon: "/assets/vectors/nav-tab-2.svg",
    link: "/completed-interviews",
    title: "Completed Interview",
  },
  {
    icon: "/assets/vectors/nav-tab-3.svg",
    link: "/datasets",
    title: "Datesets",
  },
  {
    icon: "/assets/vectors/nav-tab-4.svg",
    link: "/team",
    title: "Team",
  },
];

const DashboardLayout = ({ HeaderBtns, children }) => {
  const [currTab, setCurrTab] = useState({
    icon: "/assets/vectors/nav-tab-1.svg",
    link: "/upcoming-interview",
    title: "Upcoming Interview",
  });

  const toggleDropdown = () => {
    $(".min-tabs .layout-tabs").toggleClass("active");
    $(".min-tabs .list").slideToggle();
  };

  useEffect(() => {
    tabsData.forEach((el, idx) => {
      if (window.location.pathname.includes(el.link)) {
        setCurrTab(tabsData[idx]);
      }
    });
  });

  return (
    <div className="dashboard-layout">
      <div className="layout-left">
        <Link to="/">
          <h3 className="text-primary-1 title text-center">Hireml</h3>
        </Link>

        <div className="layout-tabs">
          {tabsData.map((el, idx) => {
            const { icon, link, title } = el;

            return (
              <NavLink key={"tab-item" + idx} to={link}>
                <img src={icon} alt={title} /> {title}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="layout-right">
        <div className="layout-head">
          <div className="head-left">
            <Link to="/" className="d-1367-none">
              <h4 className="text-primary-1 title">Hireml</h4>
            </Link>

            <div className="mb-3 greeting">Hello, Jane</div>
            <h2>Welcome Back!</h2>

            <div className="min-tabs">
              <div className="layout-tabs">
                <div className="active-item" onClick={toggleDropdown}>
                  <div className="left d-flex align-items-center gap-2">
                    <img src={currTab.icon} alt={currTab.title} />
                    <span className="fw-600">{currTab.title}</span>
                  </div>
                  <div className="right">
                    <img
                      className="chevron"
                      src="/assets/vectors/chevron.svg"
                      alt="chevron"
                    />
                  </div>
                </div>
                <div className="list">
                  {tabsData.map((el, idx) => {
                    const { icon, link, title } = el;

                    return (
                      <NavLink
                        key={"tab-item" + idx}
                        to={link}
                        onClick={toggleDropdown}
                      >
                        <img src={icon} alt={title} /> {title}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="head-right">
            {HeaderBtns && <HeaderBtns />}
            <Link to="/account" className="user">
              <img src="/assets/imgs/user.png" alt="user" />
            </Link>
          </div>
        </div>

        <div className="main-layout-content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
