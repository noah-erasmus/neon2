import React, { useState } from "react";
import { Container, Button, Col, Row, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SongCard from "../components/SongCard";
import cover from "../images/mgkCover.jpg";
import { songsInfo } from "../data.js";

function Moods() {
  const [moreMood, setMoreMood] = useState([
    {
      id: 5382226,
      title: "22",
      artist: "Deaf Havana",
    },
    {
      id: 5387729,
      title: "Poly",
      artist: "Thylacine",
    },
    {
      id: 5387589,
      title: "The Morning",
      artist: "The Weeknd",
    },
    {
      id: 5387588,
      title: "The Scientist",
      artist: "Coldplay",
    },
    {
      id: 5387518,
      ttile: "Holy ROller",
      artist: "Spiribox",
    },
    {
      id: 5382226,
      title: "Rolling in the Deep",
      artist: "/images/22.jpg",
    },
    {
      id: 5382156,
      title: "Desert Woman",
      artist: "Zhu",
    },
  ]);
  return (
    <div>
      <div className="topBarInline">
        <h1>Moods</h1>
      </div>
      <Container className="pageContent" style={{ paddingTop: 95 }}>
        <div className="mostPlayed">
          <h2>Most Played</h2>
          <Row>
            <Col />
            <Col className="podiumCol">
              <div className="podiumCard mt-3">
                <img
                  src={songsInfo.find((x) => x.id === 5387518).coverArt}
                  alt=""
                />
                <h3>Holy Roller</h3>
                <h4>Spiritbox</h4>
              </div>
              <h3 style={{ color: "#ef0078" }}>1</h3>
            </Col>
            <Col />
          </Row>

          <Row>
            <Col className="podiumCol">
              <div className="podiumCard">
                <img
                  src={songsInfo.find((x) => x.id === 5387801).coverArt}
                  alt=""
                />
                <h3>Singularity</h3>
                <h4>Stephan Bodzin</h4>
              </div>
              <h3 style={{ color: "#ef0078" }}>2</h3>
            </Col>
            <Col xs={1} />
            <Col className="podiumCol">
              <div className="podiumCard">
                <img
                  src={songsInfo.find((x) => x.id === 5382156).coverArt}
                  alt=""
                />
                <h3>Desert Woman</h3>
                <h4>Zhu</h4>
              </div>
              <h3 style={{ color: "#ef0078" }}>3</h3>
            </Col>
          </Row>
        </div>

        <div className="yourMood mt-4">
          <h2>Your Mood</h2>
          <h1>Energetic</h1>
          <h3 className=" mt-3">Want more?</h3>
          <Stack direction="horizontal" gap={3} className="moodSuggestions">
            {moreMood.map((song) => {
              return (
                <SongCard
                  key={song.id}
                  title={song.title}
                  artist={song.artist}
                  songId={song.id}
                />
              );
            })}
          </Stack>
          <h3>Want less?</h3>
          <Stack direction="horizontal" gap={3} className="moodSuggestions">
            {moreMood.map((song) => {
              return (
                <SongCard
                  key={song.id}
                  title={song.title}
                  artist={song.artist}
                  songId={song.id}
                />
              );
            })}
          </Stack>
        </div>
      </Container>
    </div>
  );
}

export default Moods;
