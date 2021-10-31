import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ReactComponent as LibraryIcon } from "../assets/library.svg";
import { ReactComponent as SettingsIcon } from "../assets/settings.svg";
import { ReactComponent as MoodIcon } from "../assets/mood.svg";

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
                <Nav.Link>
                  <div>
                    <LibraryIcon className="navBtn" />
                  </div>
                </Nav.Link>
              </LinkContainer>
              {/* <LinkContainer to="/analytics">
                <Nav.Link>Analytics</Nav.Link>
              </LinkContainer> */}
              <LinkContainer to="/moods">
                <Nav.Link>
                  <MoodIcon className="navBtn" />
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/settings">
                <Nav.Link>
                  <SettingsIcon className="navBtn" />
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
