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
import Login from "./screens/Login";
import Register from "./screens/Register";
import UpcomingInterview from "./screens/UpcomingInterview";
import CompletedInterview from "./screens/CompletedInterview";
import Datasets from "./screens/Datasets";
import Team from "./screens/Team";
import Account from "./screens/Account";

const routesData = [
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
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
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
];

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {routesData.map((el, idx) => {
          const { path, Component, ...rest } = el;

          return (
            <Route
              key={"route-item-" + idx}
              path={"/" + path}
              element={<Component {...rest} />}
            />
          );
        })}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
