const { TestWatcher } = require("jest");
const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });
});

describe("Books names test suit negative", () => {
  it("Books names should not be sorted", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Гарри Поттер",
      ])
    ).toEqual([
      "Властелин Колец",
      "Гарри Поттер",
      "Гарри Поттер",
    ]);
  });
});