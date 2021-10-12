import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cover from "../images/mgkCover.jpg";

function Library() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjoxODEsInVzZXJJZCI6NDQwMCwiYWNjZXNzVG9rZW5TZWNyZXQiOiJmNzJkNGUzMTY5YjE4MjMwZmQxMmI5ZTQ4MjVjYmU5ZjRlMmVmMjkzMzhhZmFkYTUxOGEwYTY1NGM2ZjVkODllIiwiaWF0IjoxNjMyODM3MzY3fQ.wKBR9bEeQpJ8r-Lvh_RscYXKbamALc5ViluHcQg3-4c";
  const [songs, setSongs] = useState([]);
  const [edges, setEdges] = useState([
    {
      cursor: "NTM4MjIyNg==",
      node: {
        id: "5382226",
        title: "Rolling-In-The-Deep_Adele_21.mp3",
        audioAnalysisV6: {
          __typename: "AudioAnalysisV6Finished",
          result: {
            predominantVoiceGender: "female",
            musicalEraTag: "early / mid 1970s",
          },
        },
      },
    },
  ]);
  const [resp, setResp] = useState({
    data: {
      libraryTracks: {
        pageInfo: {
          hasNextPage: false,
        },
        edges: [
          {
            node: {
              id: "9876543",
              title: "Song-song_Artist-artist_Album-album",
              audioAnalysisV6: {
                __typename: "AudioAnalysisV6Finished",
              },
            },
          },
        ],
      },
    },
  });
  // useEffect(() => {
  //   setEdges(props.resp.data.libraryTracks.edges);
  // }, []);

  const fetchData = async () => {
    var values = {};
    const query = `
        query LibraryTracksQuery {
        libraryTracks(first: 10) {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              title

              audioAnalysisV6 {
                __typename
              }
            }
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
    console.log(resp.data.libraryTracks.edges);
  }, []);

  useEffect(() => {
    setSongs(
      resp.data.libraryTracks.edges.map((i) => {
        const title = i.node.title.split("_")[0].replace(/-/g, " ");
        const artist = i.node.title.split("_")[1].replace(/-/g, " ");
        const album = i.node.title.split("_")[0].replace(/-/g, " ");
        return {
          title: title,
          artist: artist,
          album: album,
        };
      })
    );
  }, [resp]);

  // useEffect(() => {
  //   console.log(props);
  //   setEdges(props.resp.data.libraryTracks.edges);
  // }, [props]);

  // useEffect(() => {
  //   console.log(edges);

  // }, [edges]);

  return (
    <div className="">
      <div className="topBar">
        <h1>Libary</h1>
      </div>
      <Container>
        {songs.map((item) => {
          return (
            <Row>
              <Col
                xs={2}
                style={{
                  padding: 0,
                  display: "flex",
                }}
              >
                <img
                  className="libraryItemDetail"
                  src={cover}
                  alt=""
                  width="60"
                  height="60"
                  style={{
                    margin: "auto",
                  }}
                />
              </Col>
              <Col
                style={{
                  padding: 0,
                  display: "flex",
                }}
              >
                <div className="libraryItem">
                  <h3>{item.title}</h3>
                  <h4>{item.artist}</h4>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>
      {/* <h2>{props.resp.data.libraryTracks.edges[0].node.id}</h2> */}
    </div>
  );
}

export default Library;
