import { useState, ChangeEvent } from 'react';

const useInput = (validateValue: Function) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		// allow functions to be called from outside the custom hook
		value: enteredValue, 
		isValid: valueIsValid,
		hasError, 
		valueChangeHandler, 
		inputBlurHandler,
		reset
	};
};

export default useInput;