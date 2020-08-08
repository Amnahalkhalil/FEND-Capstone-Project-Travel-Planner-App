import { handleSubmit } from "./handleSubmit";
import { handleReset } from "./handleReset";

//event listeners
const submit = document.querySelector("#submitForm");

submit.addEventListener("click", handleSubmit);

const reset = document.querySelector("#reset")
reset.addEventListener("click", handleReset);

export {
    submit,
    reset
}