export default function JokeView({ jokes, error }) {
  return (
    <>
      {jokes && (
        <div className="text-white font-nunito text-center">
          <p>{jokes.setup}</p>
          <p>{jokes.punchline}</p>
        </div>
      )}
      {error && (
        <p className="text-white font-nunito text-center">
          failed to fetch data
        </p>
      )}
    </>
  );
}
