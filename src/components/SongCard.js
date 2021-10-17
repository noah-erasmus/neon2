import React from "react";
import { Container, Image } from "react-bootstrap";
import cover from "../images/mgkCover.jpg";

export default function SongCard(title, artist) {
  console.log(title.artist);
  return (
    <div className="songCard">
      <img src={cover} alt="" />
      <h3>{title.title}</h3>
      <h4>{title.artist}</h4>
    </div>
  );
}
