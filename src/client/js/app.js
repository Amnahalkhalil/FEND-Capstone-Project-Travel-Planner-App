import { handleSubmit } from "./handleSubmit";
import { handleReset } from "./handleReset";

//event listeners
const submit = document.querySelector("#submitForm");
const reset = document.querySelector("#reset")

document.addEventListener('DOMContentLoaded', () => {
    //event listeners here
    submit.addEventListener("click", handleSubmit);
    reset.addEventListener("click", handleReset);


});

export {
    submit,
    reset
}