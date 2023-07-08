import ErrorImg from "../images/error-icon.png";

export default function Error({ error }) {
  return (
    <section className="w-full min-h-[50svh] flex items-center mt-36 flex-col gap-y-6 text-center">
      <img src={ErrorImg} alt="not-found-img" className="w-[80px] h-[80px]" />
      {error.response.data.message ? (
        <>
          <h1 className="text-xl">{error.response.data.message}</h1>
          <p>responded with status {error.response.data.status}</p>
        </>
      ) : (
          <h1 className="text-xl">{error.message}</h1>
      )}

      <button className="btn" onClick={() => window.location.reload()}>
        Try again
      </button>
    </section>
  );
}
