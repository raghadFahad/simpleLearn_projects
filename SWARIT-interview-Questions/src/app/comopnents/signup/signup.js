const inputFeilds = document.querySelectorAll("input");

const validInputs = Array.from(inputFeilds).filter( input => input.value !== "");

console.log("validInputs: "+validInputs)