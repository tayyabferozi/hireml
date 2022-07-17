import React from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../components/Button";

const tabsData = [
  {
    icon: "/assets/vectors/nav-tab-1.svg",
    link: "/upcoming-interview",
    title: "Upcoming Interview",
  },
  {
    icon: "/assets/vectors/nav-tab-2.svg",
    link: "/completed-interview",
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

const DashboardLayout = () => {
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
        <div className="head">
          <div className="head-left">
            <div className="fs-22 mb-3">Hello, Jane</div>
            <h2>Welcome Back!</h2>
          </div>
          <div className="head-right">
            <div className="btns">
              <Button
                icon={{ src: "/assets/vectors/add.svg", title: "add" }}
                primary
              >
                Add an interview
              </Button>
              <Button tranparent textClassName="text-light-1">
                Start an instant interview
              </Button>
            </div>
            <div className="user">
              <img src="/assets/imgs/user.png" alt="user" />
            </div>
          </div>
        </div>

        <div className="main-layout-content"></div>
      </div>
    </div>
  );
};

export default DashboardLayout;
