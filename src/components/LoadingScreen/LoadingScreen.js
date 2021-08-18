export default function loadingScreen({ visibility }) {
  return (
    <div className={`loading-screen ${visibility}`}>
      <div className={'loading-screen-text'}>Loading...</div>
    </div>
  );
}
