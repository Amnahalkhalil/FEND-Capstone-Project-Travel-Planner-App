import { handleSubmit } from "../client/js/handleSubmit.js"
import { getCityCoordinates } from "../client/js/handleSubmit.js"

//handleSubmit 
test("handleSubmit should return true", async () => {
  expect(handleSubmit).toBeDefined();
});
test("handleSubmit should be a function", async () => {
  expect(typeof handleSubmit).toBe("function");
});

//getCityCoordinates 
test("getCityCoordinates should return true", async () => {
  expect(getCityCoordinates).toBeDefined();
});
test("getCityCoordinates should be a function", async () => {
  expect(typeof getCityCoordinates).toBe("function");
});
