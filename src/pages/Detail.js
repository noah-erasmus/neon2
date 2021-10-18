import React, { useEffect, useRef, useState } from "react";
import { Container, Image, Row, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import SongCard from "../components/SongCard";
import cover from "../images/mgkCover.jpg";
import Chart from "chart.js/auto";

// const radarData = {
// labels: [
//   "Energetic",
//   "Uplifting",
//   "Happy",
//   "Chill",
//   "Calm",
//   "Sad",
//   "Dark",
//   "Aggressive",
// ],
//   datasets: [
//     {
//       label: "Mood",
//       data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
//       fill: true,
//       backgroundColor: "rgba(54, 162, 235, 0.2)",
//       borderColor: "rgb(54, 162, 235)",
//       pointBackgroundColor: "rgb(54, 162, 235)",
//       pointBorderColor: "#fff",
//     },
//   ],
// };

// const chartConfig = {
//   type: "radar",
//   data: radarData,
//   options: {
//     elements: {
//       line: {
//         borderWidth: 3,
//       },
//     },
//   },
// };

// const MoodRadar = ({ moodData }) => {
//   const chartContainer = useRef(null);
//   const [chartInstance, setChartInstance] = useState(null);

//   useEffect(() => {
//     if (chartContainer && chartContainer.current) {
//       const newChartInstance = new Chart(chartContainer.current, chartConfig);
//       setChartInstance(newChartInstance);
//     }
//   }, [chartContainer]);

//   const updateDataset = (datasetIndex, newData) => {
//     chartInstance.data.datasets[datasetIndex] = newData;
//     chartInstance.update();
//     console.log("updated");
//   };

//   useEffect(() => {
//     if (chartInstance) {
//       updateDataset(0, moodData);
//     }
//   }, [moodData, chartInstance]);

//   return (
//     <div>
//       <canvas ref={chartContainer} height="300" width="300" />
//     </div>
//   );
// };

const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

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
          color: "white",
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

  // useEffect(() => {
  //   if (moodData !== [12, 19, 3, 5, 2, 3, 8, 5] && chartInstance !== null) {
  //     updateDataset(0, moodData);
  //     console.log("updated dataset");
  //   }
  // }, [moodData]);

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
  const [moodData, setMoodData] = useState([12, 19, 3, 5, 2, 3, 8, 5]);
  const [graph, setGraph] = useState(false);
  const [resp, setResp] = useState({
    data: {
      libraryTrack: {
        __typename: "LibraryTrack",
        audioAnalysisV6: {
          result: {
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
        console.log(data.data.libraryTrack.audioAnalysisV6.result.mood);
        // setMoodData([
        //   data.data.libraryTrack.audioAnalysisV6.result.mood.energetic,
        //   data.data.libraryTrack.audioAnalysisV6.result.mood.uplifting,
        //   data.data.libraryTrack.audioAnalysisV6.result.mood.happy,
        //   data.data.libraryTrack.audioAnalysisV6.result.mood.chilled,
        //   data.data.libraryTrack.audioAnalysisV6.result.mood.calm,
        //   data.data.libraryTrack.audioAnalysisV6.result.mood.sad,
        //   data.data.libraryTrack.audioAnalysisV6.result.mood.dark,
        //   data.data.libraryTrack.audioAnalysisV6.result.mood.aggressive,
        // ]);
        prepRadar(data.data.libraryTrack.audioAnalysisV6.result.mood);
        console.log(resp);
        console.log(moodData);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(id.slice(1));
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
    console.log(moodData);
  }, [moodData]);

  // useEffect(() => {
  //   prepRadar(resp);
  //   console.log(moodData);
  // }, [resp]);

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
    });
    setSimilar(similarSongs);
    console.log(resp);
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
