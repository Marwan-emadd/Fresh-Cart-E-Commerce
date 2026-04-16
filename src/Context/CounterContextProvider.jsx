import { useState } from "react";
import { CounterContext } from "./CounterContext";

export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(0);

  function changeCounter() {
    setCounter(Math.random());
  }

  return (
    <CounterContext.Provider value={{ counter, changeCounter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
