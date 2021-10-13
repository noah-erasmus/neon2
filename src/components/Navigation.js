import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Navigation() {
  return (
    <>
      <Navbar fixed="bottom" className="navbar" variant="dark">
        <Container>
          <Navbar.Brand href="/">neon</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <LinkContainer to="/library">
                <Nav.Link>Library</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/analytics">
                <Nav.Link>Analytics</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/moods">
                <Nav.Link>Moods</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/settings">
                <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
