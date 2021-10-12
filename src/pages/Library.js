import cover from "../images/mgkCover.jpg";

function Library(props) {
  const songs = props.resp.data.libraryTracks.edges.map((i) => {
    return {
      name: i.node.id,
      artist: i.node.title,
    };
  });

  return (
    <div className="">
      <div className="topBar">
        <h1>Libary</h1>
      </div>
      {songs.map((item) => {
        return (
          <div className="libraryItem">
            <img
              className="libraryItemDetail"
              src={cover}
              alt=""
              width="50"
              height="50"
            />
            <div className="libraryItemDetail">
              <h3>{item.name}</h3>
              <h4>{item.artist}</h4>
            </div>
          </div>
        );
      })}
      {/* <h2>{props.resp.data.libraryTracks.edges[0].node.id}</h2> */}
    </div>
  );
}

export default Library;
