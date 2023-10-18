export default function JokeView({ joke, error }) {
  return (
    <>
      {joke && (
        <div className="text-white font-nunito text-center">
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
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
