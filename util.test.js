const add = require("./util");

test("should return 3 when supplying 1 and 2 as args", () => {
  expect(add(1, 2)).toBe(3);
});
