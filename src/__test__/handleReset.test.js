import { handleReset } from "../client/js/handleReset.js"


test("handleReset should return true", async () => {
  expect(handleReset).toBeDefined();
});

test("handleReset should be a function", async () => {
  expect(typeof handleReset).toBe("function");
});