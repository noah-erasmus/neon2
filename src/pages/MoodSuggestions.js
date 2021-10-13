import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function MoodSuggestions() {
  const { mood } = useParams();
  const [songs, setSongs] = useState([]);
  const [likeSongs, setLikeSongs] = useState([]);
  const [unlikeSongs, setUnlikeSongs] = useState([]);

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjoxODEsInVzZXJJZCI6NDQwMCwiYWNjZXNzVG9rZW5TZWNyZXQiOiJmNzJkNGUzMTY5YjE4MjMwZmQxMmI5ZTQ4MjVjYmU5ZjRlMmVmMjkzMzhhZmFkYTUxOGEwYTY1NGM2ZjVkODllIiwiaWF0IjoxNjMyODM3MzY3fQ.wKBR9bEeQpJ8r-Lvh_RscYXKbamALc5ViluHcQg3-4c";

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
                result: {
                  predominantVoiceGender: "female",
                  musicalEraTag: "late 2000s / contemporary",
                  moodTags: ["energetic"],
                },
              },
            },
          },
        ],
      },
    },
  });

  const fetchData = async () => {
    var values = {};
    const query = `
        query LibraryTracksQuery {
        libraryTracks(first: 30) {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              title

              audioAnalysisV6 {
                __typename
                ... on AudioAnalysisV6Finished {
                    result {
                    predominantVoiceGender
                    musicalEraTag
                    moodTags
                    }
                }
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

  const sortSongs = () => {
    var sortedSongs = [];
    const songs = resp.data.libraryTracks.edges;
    for (var i = 0; i < songs.length; i++) {
      console.log(songs[i]);
      if (songs[i].node.audioAnalysisV6.result.moodTags[0] === mood.slice(1)) {
        sortedSongs.push(songs[i]);
      }
    }
    return sortedSongs;
  };

  useEffect(() => {
    fetchData();
    setLikeSongs(sortSongs());
  }, []);

  return (
    <div>
      <h2>Songs like:</h2>
      {likeSongs !== undefined
        ? likeSongs.map((i) => {
            return <p>{i.node.title}</p>;
          })
        : null}
      <h2>Songs unlike:</h2>
      {unlikeSongs !== undefined
        ? unlikeSongs.map((i) => {
            return <p>{i.node.title}</p>;
          })
        : null}
    </div>
  );
}
