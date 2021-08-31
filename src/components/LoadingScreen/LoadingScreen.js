export default function LoadingScreen({ visibility }) {
  return (
    <div className={`loading-screen ${visibility}`}>
      <div className={"loading-screen-text"}>Loading Battleship...</div>
    </div>
  );
}
