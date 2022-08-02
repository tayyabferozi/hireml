import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Landing from "./screens/Landing";
import Pricing from "./screens/Pricing";
import Support from "./screens/Support";
import Blogs from "./screens/Blogs";
import Blog from "./screens/Blog";
import Login from "./screens/Login";
import Register from "./screens/Register";
import UpcomingInterview from "./screens/UpcomingInterview";
import CompletedInterview from "./screens/CompletedInterview";
import Datasets from "./screens/Datasets";
import Team from "./screens/Team";
import Account from "./screens/Account";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthState } from "./store/actions/userActions";
import TOS from "./screens/TOS";
import isEmpty from "./utils/is-empty";
import ChangePassword from "./screens/ChangePassword";

const generalRoutes = [
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/pricing",
    Component: Pricing,
  },
  {
    path: "/support",
    Component: Support,
  },
  {
    path: "/blogs",
    Component: Blogs,
  },
  {
    path: "/blog/:id",
    Component: Blog,
  },
  {
    path: "/tos",
    Component: TOS,
  },
];

const openRoutes = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
];

const protectedRoutes = [
  {
    path: "/upcoming-interview",
    Component: UpcomingInterview,
  },
  {
    path: "/completed-interviews",
    Component: CompletedInterview,
  },
  {
    path: "/datasets",
    Component: Datasets,
  },
  {
    path: "/team",
    Component: Team,
  },
  {
    path: "/account",
    Component: Account,
  },
  {
    path: "/change-password",
    Component: ChangePassword,
  },
];

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [routesData, setRoutesData] = useState([]);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (userState.access_token) {
      setRoutesData([...protectedRoutes]);
    } else {
      setRoutesData([...openRoutes]);
    }
  }, [userState]);

  if (userState && !isEmpty(routesData)) {
    return (
      <Router>
        <ScrollToTop />
        <Routes>
          {generalRoutes.map((el, idx) => {
            const { path, Component, ...rest } = el;

            return (
              <Route
                key={"route-item-" + el.path + idx}
                path={"/" + path}
                element={<Component {...rest} />}
              />
            );
          })}
          {routesData.map((el, idx) => {
            const { path, Component, ...rest } = el;

            return (
              <Route
                key={"route-item-" + el.path + idx}
                path={"/" + path}
                element={<Component {...rest} />}
              />
            );
          })}

          <Route
            path="*"
            element={
              <Navigate
                to={userState.access_token ? "/upcoming-interview" : "/"}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
