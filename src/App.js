import logo from "./logo.svg";
import "./App.css";

const data = fetch("https://api.cyanite.ai/graphql", {
  method: "POST",
  body: JSON.stringify({
    query: {
      query: /* GraphQL */ `
        query LibraryTracksQuery {
          libraryTracks(first: 10) {
            edges {
              node {
                id
              }
            }
          }
        }
      `,
      variables: {
        first: 10,
      },
    },
  }),
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer" + "aae8a178286e55dd1626553bb38135ea14404",
  },
});

console.log(data);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
