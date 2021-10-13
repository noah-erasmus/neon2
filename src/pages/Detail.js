import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import cover from "../images/mgkCover.jpg";

export default function Detail() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjoxODEsInVzZXJJZCI6NDQwMCwiYWNjZXNzVG9rZW5TZWNyZXQiOiJmNzJkNGUzMTY5YjE4MjMwZmQxMmI5ZTQ4MjVjYmU5ZjRlMmVmMjkzMzhhZmFkYTUxOGEwYTY1NGM2ZjVkODllIiwiaWF0IjoxNjMyODM3MzY3fQ.wKBR9bEeQpJ8r-Lvh_RscYXKbamALc5ViluHcQg3-4c";
  const { id } = useParams();
  const [resp, setResp] = useState({
    data: {
      libraryTrack: {
        __typename: "LibraryTrack",
        id: "5382226",
        title: "Rolling-In-The-Deep_Adele_21.mp3",
      },
    },
  });
  console.log(id);
  const [song, setSong] = useState({
    title: "Loading",
    artist: "Loading",
    album: "Loading",
    id: id.slice(1),
  });

  const fetchData = async () => {
    var values = {};
    console.log(id);
    const query = `
        query LibraryTrackQuery {
        libraryTrack(id:${parseInt(id.slice(1))}) {
            __typename
            ... on LibraryTrack {
            id
            title
            audioAnalysisV6 {
          __typename
          ... on AudioAnalysisV6Finished {
            result {
              predominantVoiceGender
              musicalEraTag
              genreTags
              moodTags
            }
          }
        }
            }
            ... on LibraryTrackNotFoundError {
            message
            }
        }
        }
    `;

    await fetch("https://api.cyanite.ai/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: query,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setResp(data));
  };

  useEffect(() => {
    fetchData();
    console.log(resp);
  }, [id]);

  useEffect(() => {
    console.log(resp);
    setSong({
      title: resp.data.libraryTrack.title.split("_")[0].replace(/-/g, " "),
      artist: resp.data.libraryTrack.title.split("_")[1].replace(/-/g, " "),
      album: resp.data.libraryTrack.title
        .split("_")[2]
        .replace(/-/g, " ")
        .slice(0, -4),
      id: id.slice(1),
    });
  }, [resp]);

  return (
    <div>
      <div className="topBar">
        <h1>Song Details</h1>
      </div>
      <Container className="pageContent">
        <Image src={cover} thumbnail />
        <h1>{song.title}</h1>
        <h2>{song.artist}</h2>
        <h1>{song.album}</h1>
      </Container>
    </div>
  );
}
