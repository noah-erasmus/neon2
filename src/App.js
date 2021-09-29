import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjoxODEsInVzZXJJZCI6NDQwMCwiYWNjZXNzVG9rZW5TZWNyZXQiOiJmNzJkNGUzMTY5YjE4MjMwZmQxMmI5ZTQ4MjVjYmU5ZjRlMmVmMjkzMzhhZmFkYTUxOGEwYTY1NGM2ZjVkODllIiwiaWF0IjoxNjMyODM3MzY3fQ.wKBR9bEeQpJ8r-Lvh_RscYXKbamALc5ViluHcQg3-4c";

const secret = "99178b9a83393be0ca9eaa1eb00b5f4ffedb8";

function App() {
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
              audioAnalysisV6: {
                __typename: "AudioAnalysisV6Finished",
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
  libraryTracks(first: 10) {
    pageInfo {
      hasNextPage
    }
    edges {
      node {
        id

        audioAnalysisV6 {
          __typename
        }
      }
    }
  }
}
    `;

    const result = await fetch("https://api.cyanite.ai/graphql", {
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
  }, []);

  return (
    <div className="App">
      <h1>test</h1>
      <h2>{resp.data.libraryTracks.edges[0].node.id}</h2>
    </div>
  );
}

export default App;
