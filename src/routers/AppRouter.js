import { Switch, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users";
import PrivateRouters from "./PrivateRouters";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";

const AppRouter = (props) => {
  const Project = () => {
    return <span>Project</span>;
  };
  return (
    <>
      <Switch>
        {/* <Route path="/project">Project</Route>
        <Route path="/users">
          <Users />
        </Route> */}
        <PrivateRouters path="/users" component={Users} />
        <PrivateRouters path="/projects" component={Project} />
        <PrivateRouters path="/roles" component={Role} />
        <PrivateRouters path="/group-roles" component={GroupRole} />

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/" exact>
          Home
        </Route>
        <Route path="*" exact>
          404 Not Found
        </Route>
      </Switch>
    </>
  );
};

export default AppRouter;
