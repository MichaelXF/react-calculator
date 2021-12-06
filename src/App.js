import { useReducer } from "react";
import iPhone12 from "./assets/iPhone12.png";
import iPhone12Webp from "./assets/iPhone12.webp";
import NumberButton from "./NumberButton";
import numberWithCommas from "./NumberWithCommas";
import OperatorButton from "./OperatorButton";

function App() {
  var [state, dispatch] = useReducer(
    (state, action) => {
      function compute(overrideOperator) {
        var num1 = parseFloat(state.previousNumber);
        var num2 = parseFloat(state.currentNumber);

        var output;

        switch (overrideOperator || state.operator) {
          case "+":
            output = num1 + num2;
            break;
          case "-":
            output = num1 - num2;
            break;
          case "/":
            output = num1 / num2;
            break;
          case "*":
            output = num1 * num2;
            break;
          default:
            throw new Error(JSON.stringify([state, overrideOperator]));
        }

        return output + "";
      }

      switch (action.type) {
        case "plus_minus":
          return {
            ...state,
            currentNumber: (-Number(state.currentNumber || "0")).toString(),
          };
        case "percentage":
          return {
            ...state,
            currentNumber: (
              Number(state.currentNumber || "0") / 100
            ).toString(),
          };

        case "clear":
          return {
            currentNumber: "0",
            previousNumber: "",
            operator: "",
          };

        case "add_number":
          if (action.payload === "." && state.currentNumber.includes(".")) {
            return { ...state };
          }

          if (action.payload === "0" && state.currentNumber === "0") {
            return { ...state };
          }

          if (state.currentNumber.length > 8) {
            return { ...state };
          }

          if (action.payload !== "." && state.currentNumber === "0") {
            return { ...state, currentNumber: action.payload };
          }

          return {
            ...state,
            currentNumber: (state.currentNumber + action.payload).toString(),
          };

        case "set_operator":
          if (!state.currentNumber) {
            return {
              ...state,
              operator: action.payload,
            };
          }
          if (!state.previousNumber) {
            return {
              previousNumber: state.currentNumber,
              currentNumber: "",
              operator: action.payload,
            };
          }

          return {
            previousNumber: compute(action.payload),
            currentNumber: "",
            operator: "",
          };

        case "evaluate":
          if (
            !state.currentNumber ||
            !state.previousNumber ||
            !state.operator
          ) {
            return { ...state };
          }
          return {
            previousNumber: compute(),
            currentNumber: "",
            operator: "",
          };

        default:
          throw new Error();
      }
    },
    {
      currentNumber: "0",
      previousNumber: "",
      operator: "",
    }
  );

  var displayNumber = state.currentNumber || state.previousNumber;
  var display = numberWithCommas(displayNumber);
  var fontSize = 70;

  while ((fontSize * display.length) / 2 > 280) {
    fontSize--;
  }

  return (
    <div className='calculator-container'>
      <div className='calculator'>
        <img
          className='calculator-background-image'
          src={iPhone12}
          alt='iPhone 12'
          style={{
            filter: "grayscale(100%) brightness(6%)",
          }}
        />
        <img
          className='calculator-background-image-notch'
          src={iPhone12Webp}
          alt='iPhone 12 Notch'
        />

        <div className='calculator-content'>
          <div
            className='calculator-operand'
            style={{
              fontSize: fontSize,
            }}
          >
            {display}
          </div>

          <div className='calculator-row'>
            <button
              className='gray'
              onClick={() => {
                dispatch({ type: "clear" });
              }}
            >
              {!state.previousNumber && !state.currentNumber ? "A" : ""}C
            </button>
            <button
              className='gray'
              onClick={() => {
                dispatch({ type: "plus_minus" });
              }}
            >
              ±
            </button>
            <button
              className='gray'
              onClick={() => {
                dispatch({ type: "percentage" });
              }}
            >
              %
            </button>
            <OperatorButton
              operator='/'
              symbol='÷'
              dispatch={dispatch}
              state={state}
            />
          </div>
          <div className='calculator-row'>
            <NumberButton number={7} dispatch={dispatch} />
            <NumberButton number={8} dispatch={dispatch} />
            <NumberButton number={9} dispatch={dispatch} />
            <OperatorButton
              operator='*'
              symbol='×'
              dispatch={dispatch}
              state={state}
            />
          </div>
          <div className='calculator-row'>
            <NumberButton number={4} dispatch={dispatch} />
            <NumberButton number={5} dispatch={dispatch} />
            <NumberButton number={6} dispatch={dispatch} />
            <OperatorButton
              operator='-'
              symbol='−'
              dispatch={dispatch}
              state={state}
            />
          </div>
          <div className='calculator-row'>
            <NumberButton number={1} dispatch={dispatch} />
            <NumberButton number={2} dispatch={dispatch} />
            <NumberButton number={3} dispatch={dispatch} />
            <OperatorButton
              operator='+'
              symbol='+'
              dispatch={dispatch}
              state={state}
            />
          </div>
          <div className='calculator-row'>
            <NumberButton className='span-2' number={0} dispatch={dispatch} />

            <NumberButton number={"."} dispatch={dispatch} />
            <button
              className='orange'
              onClick={() => {
                dispatch({ type: "evaluate" });
              }}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
