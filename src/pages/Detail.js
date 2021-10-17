import React, { useEffect, useState } from "react";
import { Container, Image, Row, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import SongCard from "../components/SongCard";
import cover from "../images/mgkCover.jpg";

export default function Detail() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjoxODEsInVzZXJJZCI6NDQwMCwiYWNjZXNzVG9rZW5TZWNyZXQiOiJmNzJkNGUzMTY5YjE4MjMwZmQxMmI5ZTQ4MjVjYmU5ZjRlMmVmMjkzMzhhZmFkYTUxOGEwYTY1NGM2ZjVkODllIiwiaWF0IjoxNjMyODM3MzY3fQ.wKBR9bEeQpJ8r-Lvh_RscYXKbamALc5ViluHcQg3-4c";
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [resp, setResp] = useState({
    data: {
      libraryTrack: {
        __typename: "LibraryTrack",
        id: "5382226",
        title: "Rolling-In-The-Deep_Adele_21.mp3",
        similarLibraryTracks: {
          __typename: "SimilarLibraryTrackConnection",
          edges: [
            {
              node: {
                libraryTrack: {
                  id: "5387589",
                  title: "The-Morning_The-Weeknd_Trilogy.mp3",
                },
              },
            },
            {
              node: {
                libraryTrack: {
                  id: "5382133",
                  title:
                    "Bloody-Valentine_Machine-Gun-Kelly_Tickets-To-My-Downfall.mp3",
                },
              },
            },
            {
              node: {
                libraryTrack: {
                  id: "5387588",
                  title:
                    "The-Scientist_Coldplay_A-Rush-of-Blood-to-the-Head.mp3",
                },
              },
            },
            {
              node: {
                libraryTrack: {
                  id: "5382226",
                  title: "Rolling-In-The-Deep_Adele_21.mp3",
                },
              },
            },
            {
              node: {
                libraryTrack: {
                  id: "5382135",
                  title: "22_Deaf-Havana_Old-Souls.mp3",
                },
              },
            },
            {
              node: {
                libraryTrack: {
                  id: "5387730",
                  title: "Nurture_Thornhill_The-Dark-Pool.mp3",
                },
              },
            },
            {
              node: {
                libraryTrack: {
                  id: "5387518",
                  title: "Holy-Roller_Spiritbox_Eternal-Blue.mp3",
                },
              },
            },
            {
              node: {
                libraryTrack: {
                  id: "5387729",
                  title: "Poly_Thylacine_Transsiberian.mp3",
                },
              },
            },
            {
              node: {
                libraryTrack: {
                  id: "5387872",
                  title: "Raise-Your-Weapon_deadmau5 _4x4=12.mp3",
                },
              },
            },
            {
              node: {
                libraryTrack: {
                  id: "5382156",
                  title: "Desert-Woman_Zhu_Ringos-Desert.mp3",
                },
              },
            },
          ],
        },
      },
    },
  });
  console.log(id);
  const [similar, setSimilar] = useState([
    {
      id: 234234,
      title: "Loading",
      artist: "Loading",
      album: "Loading",
    },
  ]);
  const [song, setSong] = useState({
    title: "Loading",
    artist: "Loading",
    album: "Loading",
    id: id.slice(1),
  });

  const fetchData = async () => {
    console.log(id);
    const query = `
        query SimilarTracksQuery {
          libraryTrack(id: 5387871) {
            __typename
            ... on Error {
              message
            }
            ... on LibraryTrack {
              id
              similarLibraryTracks(first:10) {
                __typename
                ... on SimilarLibraryTracksError {
                  code
                  message
                }
                ... on SimilarLibraryTrackConnection {
                  edges {
                    node {
                      libraryTrack {
                        id
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          libraryTrack(id:5387871) {
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
      .then((data) => {
        setResp(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    console.log(resp);
  }, []);

  useEffect(() => {
    console.log(resp);
    const similarSongs = [];
    for (
      var i = 0;
      i < resp.data.libraryTrack.similarLibraryTracks.edges.length;
      i++
    ) {
      similarSongs.push({
        id: resp.data.libraryTrack.similarLibraryTracks.edges[i].node
          .libraryTrack.id,
        title: resp.data.libraryTrack.similarLibraryTracks.edges[
          i
        ].node.libraryTrack.title
          .split("_")[0]
          .replace(/-/g, " "),
        artist: resp.data.libraryTrack.similarLibraryTracks.edges[
          i
        ].node.libraryTrack.title
          .split("_")[1]
          .replace(/-/g, " "),
        album: resp.data.libraryTrack.similarLibraryTracks.edges[
          i
        ].node.libraryTrack.title
          .split("_")[2]
          .replace(/-/g, " "),
      });
    }
    setSong({
      title: resp.data.libraryTrack.title.split("_")[0].replace(/-/g, " "),
      artist: resp.data.libraryTrack.title.split("_")[1].replace(/-/g, " "),
      album: resp.data.libraryTrack.title
        .split("_")[2]
        .replace(/-/g, " ")
        .slice(0, -4),
      id: id.slice(1),
    });
    setSimilar(similarSongs);
    console.log(similar);
  }, [resp]);

  const songList = similar.map((song) => (
    <SongCard key={song.id} title={song.title} artist={song.artist} />
  ));

  return (
    <div style={{ height: "100vh" }}>
      <div className="topBar">
        <h1>Song Details</h1>
      </div>
      <Container className="pageContent" style={{ paddingTop: 110 }}>
        {loading ? (
          <div className="detailsLoader">
            <PuffLoader color="#ef0078" loading={loading} size={150} />
          </div>
        ) : (
          <>
            <Image src={cover} thumbnail />
            <Container style={{ marginLeft: 0 }}>
              <h1
                style={{
                  color: "white",
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                {song.title}
              </h1>
              <h2
                style={{
                  color: "white",
                  fontSize: 16,
                }}
              >
                {song.artist}
              </h2>
              <h3
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                Similar Songs:
              </h3>
              <Stack direction="horizontal" gap={3} className="suggestionGrid">
                {songList}

                {/* {similar.map((song) => (
                  <div>
                    <SongCard title={song.title} />{" "}
                  </div>
                  <div>{song.title}</div>
                ))} */}
              </Stack>
            </Container>
          </>
        )}
        {/* <h1
          style={{
            color: "white",
          }}
        >
          {song.album}
        </h1> */}
      </Container>
    </div>
  );
}
