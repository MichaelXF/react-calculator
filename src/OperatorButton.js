export default function OperatorButton({ operator, symbol, dispatch, state }) {
  return (
    <button
      className={
        "orange" +
        (state.operator === operator && !state.currentNumber ? " active" : "")
      }
      onClick={() => {
        dispatch({ type: "set_operator", payload: operator });
      }}
    >
      {symbol}
    </button>
  );
}
