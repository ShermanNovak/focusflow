import { useState, ChangeEvent } from "react";

export default function useTextInput() {
  const [enteredValue, setEnteredValue] = useState("");

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  return {
    value: enteredValue,
    valueChangeHandler,
  };
}
