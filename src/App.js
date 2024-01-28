import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AppRouter from "./routers/AppRouter";
import { Bars } from "react-loader-spinner";
import { UserContext } from "./context/UserContex";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Router>
        {user && user.isLoading ? (
          <div className="loading-container">
            <Bars
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <div>Loading data........</div>
          </div>
        ) : (
          <>
            {" "}
            <div className="app-header">
              <Nav />
            </div>
            <div className="app-container">
              <AppRouter />
              {/* <Nav></Nav> */}
              {/* {account && !_.isEmpty(account) && account.isAuthnticated && <Nav />} */}
            </div>
          </>
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </Router>
    </>
  );
}

export default App;
