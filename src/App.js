import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Settings from "./pages/Settings";
import Moods from "./pages/Moods";
import Analytics from "./pages/Analytics";
import Library from "./pages/Library";
import { Navbar } from "react-bootstrap";
import Home from "./pages/Home";
import { Route, Switch } from "react-router";
import Navigation from "./components/Navigation";

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
        title

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

  const [navState, setNavState] = useState("Home");

  return (
    <>
      <Switch>
        <Route path="/library">
          <Library resp={resp} />
        </Route>
        <Route path="/analytics">
          <Analytics />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/moods">
          <Moods />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Navigation />
      {/* navState === "Home" ? <Home /> : navState === "Library" ? <Library /> :
      navState === "Analytics" ? <Analytics /> : navState === "Moods" ?
      <Moods /> : navState === "Settings" ? <Settings /> : */}
    </>
  );
}

export default App;
