import React from "react";
import { Container, Image } from "react-bootstrap";
import { songsInfo } from "../data.js";
import cover from "../images/mgkCover.jpg";

export default function SongCard(title, artist, songId) {
  console.log(title);
  return (
    <div className="songCard">
      <img
        src={
          ".." + songsInfo.find((x) => x.id === parseInt(title.songId)).coverArt
        }
        alt=""
      />
      <h3>{title.title}</h3>
      <h4>{title.artist}</h4>
    </div>
  );
}
