import "./Nav.scss";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
// import { useEffect } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { UserContext } from "../../context/UserContex";
import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../logo.svg";
import { toast } from "react-toastify";

import { logoutUser } from "../../services/userService";
const NavHeader = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();
  const handleLogout = async () => {
    let data = await logoutUser(); //clear cookies
    localStorage.removeItem("jwt"); // clear local storage
    logoutContext(); // clear user in context
    if (data && +data.EC === 0) {
      toast.success("Logout succeeds...");
      history.push("/login");
    } else {
      toast.error(data.EM);
    }
  };
  if ((user && user.isAuthnticated === true) || location.pathname === "/") {
    return (
      <>
        {/* <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>

        </div> */}
        <div className="nav-header">
          <Navbar expand="lg" bg="header">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
                <span className="brand-name">React</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Users
                  </NavLink>
                  <NavLink to="/projects" className="nav-link">
                    Projects
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.isAuthnticated === true ? (
                    <>
                      <Nav.Item className="nav-link">
                        Welcome {user.account.username}
                      </Nav.Item>
                      <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">
                          Change Password
                        </NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                          <span onClick={() => handleLogout()}>Lout Out</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
