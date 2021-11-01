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
import Detail from "./pages/Detail";
import MoodSuggestions from "./pages/MoodSuggestions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";

const secret = "99178b9a83393be0ca9eaa1eb00b5f4ffedb8";

function App() {
  const [navState, setNavState] = useState("Home");

  return (
    <div
      style={{
        backgroundColor: "#121212",
      }}
    >
      <Switch>
        <Route path="/library">
          {/* {resp.resp.data.libraryTracks.pageInfo.hasNextPage !== false ? (
            <Library resp={resp} />
          ) : null} */}
          <Library />
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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Route path="/moodSuggestions/:mood">
          <MoodSuggestions />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Navigation />
      {/* navState === "Home" ? <Home /> : navState === "Library" ? <Library /> :
      navState === "Analytics" ? <Analytics /> : navState === "Moods" ?
      <Moods /> : navState === "Settings" ? <Settings /> : */}
    </div>
  );
}

export default App;
