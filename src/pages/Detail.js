import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import SongCard from "../components/SongCard";
import cover from "../images/mgkCover.jpg";
import Chart from "chart.js/auto";
import { songsInfo } from "../data.js";
import { BsPlayFill } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import AudioPlayer from "../components/AudioPlayer";
import { ReactComponent as HeartEmpty } from "../assets/heart-regular.svg";
import { ReactComponent as HeartFull } from "../assets/heart-solid.svg";

const chartConfig = {
  type: "radar",
  data: {
    labels: [
      "Energetic",
      "Uplifting",
      "Happy",
      "Chill",
      "Calm",
      "Sad",
      "Dark",
      "Aggressive",
    ],
    datasets: [
      {
        label: "",
        data: [12, 19, 3, 5, 2, 3, 8, 5],
        fill: true,
        backgroundColor: "rgba(239, 0, 120, 0.5)",
        borderColor: "rgba(239, 0, 120, 1)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "rgba(239, 0, 120, 1)",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  },
  options: {
    plugins: {
      title: { display: false },
      legend: { display: false },
      tooltips: { enabled: false },
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            display: false,
          },
        ],
      },
    },
    scales: {
      r: {
        ticks: {
          display: false,
          maxTicksLimit: 6,
        },
        grid: {
          color: "rgba(255,255,255,0.5",
        },
        pointLabels: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
    },
  },
};

const RadarChart = ({ moodData }) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    console.log(chartInstance);
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  setTimeout(() => {
    if (chartInstance) updateDataset(0, moodData);
  }, 500);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default function Detail() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjoxODEsInVzZXJJZCI6NDQwMCwiYWNjZXNzVG9rZW5TZWNyZXQiOiJmNzJkNGUzMTY5YjE4MjMwZmQxMmI5ZTQ4MjVjYmU5ZjRlMmVmMjkzMzhhZmFkYTUxOGEwYTY1NGM2ZjVkODllIiwiaWF0IjoxNjMyODM3MzY3fQ.wKBR9bEeQpJ8r-Lvh_RscYXKbamALc5ViluHcQg3-4c";
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [coverArt, setCoverArt] = useState("/images/mgkCover.jpg");
  const [spotify, setSpotify] = useState("");
  const [liked, setLiked] = useState(false);
  const [player, setPlayer] = useState(
    songsInfo.find((x) => x.id === parseInt(id.slice(1)))
  );
  const [moodData, setMoodData] = useState([12, 19, 3, 5, 2, 3, 8, 5]);
  const [graph, setGraph] = useState(false);
  const [resp, setResp] = useState({
    data: {
      libraryTrack: {
        __typename: "LibraryTrack",
        audioAnalysisV6: {
          result: {
            genreTags: ["rapHipHop", "pop"],
            bpm: 100,
            mood: {
              aggressive: 0.27846482396125793,
              calm: 0.07282793521881104,
              chilled: 0.16898910701274872,
              dark: 0.8351048231124878,
              energetic: 0.341153621673584,
              epic: 0.0919075608253479,
              happy: 0.03758924454450607,
              romantic: 0.06194641441106796,
              sad: 0.36682936549186707,
              scary: 0.5641674399375916,
              sexy: 0.09319555759429932,
              ethereal: 0.44223517179489136,
              uplifting: 0.08759928494691849,
            },
          },
        },
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
          ],
        },
      },
    },
  });

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
    genre1: "Loading",
    genre2: "Loading",
    bpm: 100,
  });

  const fetchData = async (id) => {
    const query = `
        query SimilarTracksQuery {
          libraryTrack(id: ${parseInt(id)}) {
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
          libraryTrack(id:${parseInt(id)}) {
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
                      bpm
                      genreTags
                      mood {
                        aggressive
                        calm
                        chilled
                        dark
                        energetic
                        epic
                        happy
                        romantic
                        sad
                        scary
                        sexy
                        ethereal
                        uplifting
                      }
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
        prepRadar(data.data.libraryTrack.audioAnalysisV6.result.mood);

        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(id.slice(1));
    const cover = songsInfo.find(
      (x) => x.id === parseInt(id.slice(1))
    ).coverArt;
    const spotifyUrl = songsInfo.find(
      (x) => x.id === parseInt(id.slice(1))
    ).spotifyLink;
    setSpotify(spotifyUrl);
    setCoverArt(cover);
  }, []);

  const prepRadar = (resp) => {
    console.log(resp);
    console.log(resp.energetic);
    const energetic = resp.energetic;
    const uplifting = resp.uplifting;
    const happy = resp.happy;
    const chilled = resp.chilled;
    const calm = resp.calm;
    const sad = resp.sad;
    const dark = resp.dark;
    const aggressive = resp.aggressive;
    const data4Mood = [
      energetic,
      uplifting,
      happy,
      chilled,
      calm,
      sad,
      dark,
      aggressive,
    ];

    console.log(data4Mood);
    setMoodData(data4Mood);
    console.log(moodData);
    setGraph(true);
  };

  useEffect(() => {
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
      genre1: resp.data.libraryTrack.audioAnalysisV6.result.genreTags[0],
      genre2: resp.data.libraryTrack.audioAnalysisV6.result.genreTags[1],
      bpm: resp.data.libraryTrack.audioAnalysisV6.result.bpm,
    });
    setSimilar(similarSongs);
    console.log(resp);
  }, [resp]);

  const songList = similar.map((song) => (
    <LinkContainer to={`/detail/:${song.id}`}>
      <SongCard
        key={song.id}
        title={song.title}
        artist={song.artist}
        cover={song.id}
      />
    </LinkContainer>
  ));

  return (
    <div style={{ height: "100vh" }}>
      <div className="topBarInline">
        <h1>Song Data</h1>
      </div>
      <Container className="pageContent" style={{ paddingTop: 95 }}>
        {loading ? (
          <div className="detailsLoader">
            <PuffLoader color="#ef0078" loading={loading} size={150} />
          </div>
        ) : (
          <>
            <Image thumbnail src={coverArt} />
            <Container style={{ marginLeft: 0 }}>
              <Row>
                <Col xs={9}>
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
                </Col>
                <Col>
                  <div className="likeBtn">
                    {liked ? (
                      <button
                        type="button"
                        onClick={() => {
                          setLiked(false);
                        }}
                      >
                        <HeartFull />
                      </button>
                    ) : (
                      <button type="button" onClick={() => setLiked(true)}>
                        <HeartEmpty />
                      </button>
                    )}
                  </div>
                </Col>
              </Row>
              <Container className="moodRadar">
                {graph ? <RadarChart moodData={moodData} /> : null}
              </Container>
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
                {similar.map((song) => {
                  console.log(
                    ".." +
                      songsInfo.find((x) => x.id === parseInt(song.id)).coverArt
                  );
                  return (
                    <LinkContainer to={`/detail/:${song.id}`}>
                      <SongCard
                        key={song.id}
                        title={song.title}
                        artist={song.artist}
                        songId={song.id}
                      />
                    </LinkContainer>
                  );
                })}
              </Stack>
            </Container>
            <div className="playerHolder">
              <AudioPlayer tracks={[player]} />
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
