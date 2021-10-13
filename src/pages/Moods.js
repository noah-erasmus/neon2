import React from "react";
import { Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Moods() {
  return (
    <div>
      <div className="topBar">
        <h1>Moods</h1>
      </div>
      <Container className="pageContent">
        <Container>
          <h3>How are you feeling?</h3>
          <Container className="moodBtns">
            <LinkContainer to={`/moodSuggestions/:happy`}>
              <Button className="moodBtn">Happy</Button>
            </LinkContainer>
            <LinkContainer to={`/moodSuggestions/:sad`}>
              <Button className="moodBtn">Sad</Button>
            </LinkContainer>
            <LinkContainer to={`/moodSuggestions/:energetic`}>
              <Button className="moodBtn">Energetic</Button>
            </LinkContainer>
            <LinkContainer to={`/moodSuggestions/:chilled`}>
              <Button className="moodBtn">Chilled</Button>
            </LinkContainer>
          </Container>
        </Container>
      </Container>
    </div>
  );
}

export default Moods;
