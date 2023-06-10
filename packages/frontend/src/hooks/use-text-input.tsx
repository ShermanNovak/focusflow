import { useState, ChangeEvent } from "react";

export default function useTextInput() {
  const [enteredValue, setEnteredValue] = useState("");
  const [hasChanged, setHasChanged] = useState(false);

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== enteredValue) {
		setHasChanged(true);
    }

    setEnteredValue(event.target.value);
  };

  const setHasChangedToFalse = () => {
	setHasChanged(false);
  }

  return {
    value: enteredValue,
    valueChangeHandler,
	hasChanged,
	setHasChangedToFalse
  };
}
