export default function JokeView({ joke, error, isPending }) {
  return (
    <>
      {isPending && (
        <p className="text-green-400  font-nunito text-center">
          Loading jokes...
        </p>
      )}
      {joke && !isPending && (
        <div className="text-white font-nunito text-center">
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </div>
      )}
      {error && (
        <p className="text-red-500 font-nunito text-center">
          failed to fetch data
        </p>
      )}
    </>
  );
}
