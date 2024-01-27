import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { UserContext } from "../context/UserContex";

const PrivateRouters = (props) => {
  const { user } = useContext(UserContext);
  let history = useHistory();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
    }
    if (session) {
    }
  }, []);
  // useEffect(() => {}, []);
  return (
    <>
      <Route path={props.path} component={props.component} />
    </>
  );
};

export default PrivateRouters;
