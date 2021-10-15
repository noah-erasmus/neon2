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
      id: 234235,
      title: "Loading_Loading_Loading",
    },
  ]);
  const [song, setSong] = useState({
    title: "Loading",
    artist: "Loading",
    album: "Loading",
    id: id.slice(1),
  });

  // const fetchSimilar = async () => {
  //   const query = `
  //       query SimilarTracksQuery {
  //       libraryTrack(id: ${parseInt(id.slice(1))}) {
  //         __typename
  //         ... on Error {
  //           message
  //         }
  //         ... on LibraryTrack {
  //           id
  //           similarLibraryTracks(first:10) {
  //             __typename
  //             ... on SimilarLibraryTracksError {
  //               code
  //               message
  //             }
  //             ... on SimilarLibraryTrackConnection {
  //               edges {
  //                 node {
  //                   libraryTrack {
  //                     id
  //                     title
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `;
  // }

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
      .then((data) => setResp(data));
  };

  // const fetchData = async () => {
  //   var values = {};
  //   console.log(id);
  //   const query = `
  //       query LibraryTrackQuery {
  //       libraryTrack(id:${parseInt(id.slice(1))}) {
  //           __typename
  //           ... on LibraryTrack {
  //           id
  //           title
  //           audioAnalysisV6 {
  //         __typename
  //         ... on AudioAnalysisV6Finished {
  //           result {
  //             predominantVoiceGender
  //             musicalEraTag
  //             genreTags
  //             moodTags
  //           }
  //         }
  //       }
  //           }
  //           ... on LibraryTrackNotFoundError {
  //           message
  //           }
  //       }
  //       }
  //   `;

  //   await fetch("https://api.cyanite.ai/graphql", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       query: query,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setResp(data));
  // };

  useEffect(() => {
    fetchData();
    console.log(resp);
  }, []);

  useEffect(() => {
    console.log(resp);
    const similarSongs = [];
    console.log(resp.data.libraryTrack.similarLibraryTracks.edges);
    for (
      var i = 0;
      i < resp.data.libraryTrack.similarLibraryTracks.edges.length;
      i++
    ) {
      similarSongs.push(resp.data.libraryTrack.similarLibraryTracks.edges[i]);
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

  return (
    <div style={{ height: "100vh" }}>
      <div className="topBar">
        <h1>Song Details</h1>
      </div>
      <Container className="pageContent" style={{ paddingTop: 10 }}>
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
              fontSize: 14,
            }}
          >
            Similar Songs:
            {similar.map((item) => {
              return <p>{item.node.libraryTrack.title}</p>;
            })}
          </h3>
        </Container>
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
