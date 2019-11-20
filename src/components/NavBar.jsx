import React from "react";

import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

const NavBar = () => (
  <Navbar>
    <Navbar.Brand>
      <Link to="/" style={{ textDecoration: "None" }}>
        Central Information System
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        <Link to="/create" className="btn btn-primary text-white">
          Create New Entry
        </Link>
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>
);

export default NavBar;
