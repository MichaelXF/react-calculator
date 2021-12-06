export default function NumberButton({ className, number, dispatch }) {
  return (
    <button
      onClick={() => {
        dispatch({
          type: "add_number",
          payload: number.toString(),
        });
      }}
      className={className}
    >
      {number}
    </button>
  );
}
