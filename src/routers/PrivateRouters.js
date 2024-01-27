import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { UserContext } from "../context/UserContex";

const PrivateRouters = (props) => {
  const { user } = useContext(UserContext);

  if (user && user.isAuthnticated === true) {
    return (
      <>
        <Route path={props.path} component={props.component} />
      </>
    );
  } else {
    return <Redirect to="/login"></Redirect>;
  }
};

export default PrivateRouters;
