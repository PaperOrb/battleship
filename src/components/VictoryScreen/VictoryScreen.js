export default function VictoryScreen({ visibility, winMsg, restartGame }) {
  return (
    <div className={`victory-screen ${visibility}`}>
      <div className={"victory-screen-text"}>{winMsg}</div>
      <button className={"restart-btn"} onClick={restartGame}>
        Restart?
      </button>
    </div>
  );
}
