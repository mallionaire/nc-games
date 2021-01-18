const { formatDates, formatComments, makeRefObj } = require("./utils");

describe("formatDates", () => {
  it("returns an array of objects when passed an array of Objects", () => {
    const input = [
      {
        body: "I loved this game too!",
        belongs_to: "Jenga",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    const output = [
      {
        body: "I loved this game too!",
        belongs_to: "Jenga",
        created_by: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389),
      },
    ];
    expect(formatDates(input)).toEqual(output);
  });
  it("returns multiple changed objects when passed an array of objects", () => {
    const input = [
      {
        body: "I loved this game too!",
        belongs_to: "Jenga",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body: "My dog loved this game too!",
        belongs_to: "Ultimate Werewolf",
        created_by: "icellusedkars",
        votes: 3,
        created_at: 1610964545410,
      },
      {
        body: "I didn't know dogs could play games",
        belongs_to: "Ultimate Werewolf",
        created_by: "butter_bridge",
        votes: 10,
        created_at: 1610964588110,
      },
    ];
    const output = [
      {
        body: "I loved this game too!",
        belongs_to: "Jenga",
        created_by: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389),
      },
      {
        body: "My dog loved this game too!",
        belongs_to: "Ultimate Werewolf",
        created_by: "icellusedkars",
        votes: 3,
        created_at: new Date(1610964545410),
      },
      {
        body: "I didn't know dogs could play games",
        belongs_to: "Ultimate Werewolf",
        created_by: "butter_bridge",
        votes: 10,
        created_at: new Date(1610964588110),
      },
    ];
    formatDates(input).forEach((commentObj) => {
      expect(commentObj.created_at).toBeInstanceOf(Date);
    });
  });
  it("does not mutate the original input array", () => {
    const input = [
      {
        body: "I loved this game too!",
        belongs_to: "Jenga",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body: "My dog loved this game too!",
        belongs_to: "Ultimate Werewolf",
        created_by: "icellusedkars",
        votes: 3,
        created_at: 1610964545410,
      },
    ];
    const inputCopy = [
      {
        body: "I loved this game too!",
        belongs_to: "Jenga",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body: "My dog loved this game too!",
        belongs_to: "Ultimate Werewolf",
        created_by: "icellusedkars",
        votes: 3,
        created_at: 1610964545410,
      },
    ];
    formatDates(input);
    expect(input).toEqual(inputCopy);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object, when passed an empty array", () => {
    const input = [];
    const output = {};
    expect(makeRefObj(input)).toEqual(output);
  });
  it("makes a reference object when passed an array with one object", () => {
    const input = [
      {
        game_review_id: 2,
        title: "Jenga",
        owner: "philippaclaire9",
        designer: "Leslie Scott",
        review_body: "Fiddly fun for all the family",
        category: "Dexterity",
        votes: 5,
      },
    ];
    expect(makeRefObj(input)).toEqual({ Jenga: 2 });
  });
  it("works with longer arrays of objects", () => {
    const input = [
      {
        game_review_id: 1,
        title: "Agricola",
        owner: "mallionaire",
        designer: "Uwe Rosenberg",
        review_body: "Farmyard fun!",
        category: "Euro game",
        created_at: "2021-01-18T10:00:20.514Z",
        votes: 1,
      },
      {
        game_review_id: 2,
        title: "Jenga",
        owner: "philippaclaire9",
        designer: "Leslie Scott",
        review_body: "Fiddly fun for all the family",
        category: "Dexterity",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 5,
      },
      {
        game_review_id: 3,
        title: "Ultimate Werewolf",
        owner: "bainesface",
        designer: "Akihisa Okui",
        review_body: "We couldn't find the werewolf!",
        category: "Social deduction",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 5,
      },
    ];
    expect(makeRefObj(input)).toEqual({
      Jenga: 2,
      Agricola: 1,
      "Ultimate Werewolf": 3,
    });
  });
  it("does not mutate the original array", () => {
    const input = [
      {
        game_review_id: 1,
        title: "Agricola",
        owner: "mallionaire",
        designer: "Uwe Rosenberg",
        review_body: "Farmyard fun!",
        category: "Euro game",
        created_at: "2021-01-18T10:00:20.514Z",
        votes: 1,
      },
      {
        game_review_id: 2,
        title: "Jenga",
        owner: "philippaclaire9",
        designer: "Leslie Scott",
        review_body: "Fiddly fun for all the family",
        category: "Dexterity",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 5,
      },
      {
        game_review_id: 3,
        title: "Ultimate Werewolf",
        owner: "bainesface",
        designer: "Akihisa Okui",
        review_body: "We couldn't find the werewolf!",
        category: "Social deduction",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 5,
      },
    ];
    const inputCopy = [
      {
        game_review_id: 1,
        title: "Agricola",
        owner: "mallionaire",
        designer: "Uwe Rosenberg",
        review_body: "Farmyard fun!",
        category: "Euro game",
        created_at: "2021-01-18T10:00:20.514Z",
        votes: 1,
      },
      {
        game_review_id: 2,
        title: "Jenga",
        owner: "philippaclaire9",
        designer: "Leslie Scott",
        review_body: "Fiddly fun for all the family",
        category: "Dexterity",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 5,
      },
      {
        game_review_id: 3,
        title: "Ultimate Werewolf",
        owner: "bainesface",
        designer: "Akihisa Okui",
        review_body: "We couldn't find the werewolf!",
        category: "Social deduction",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 5,
      },
    ];
    makeRefObj(input);
    expect(input).toEqual(inputCopy);
  });
});

describe("formatComments", () => {
  it("returns an empty array when passed an empty array", () => {
    const input = [];
    const output = formatComments(input, {});
    expect(output).not.toBe(input);
    expect(output).toEqual([]);
  });
  it("returns an array of objects, with an 'author' key", () => {
    const input = [
      {
        body: "I didn't know dogs could play games",
        belongs_to: "Ultimate Werewolf",
        created_by: "butter_bridge",
        votes: 10,
        created_at: 1610964588110,
      },
    ];
    const output = formatComments(input, {});
    expect(output[0].author).toEqual("butter_bridge");
    expect(output[0].created_by).toEqual(undefined);
  });
  it("does not mutate the original array of objects", () => {
    const input = [
      {
        body: "My dog loved this game too!",
        belongs_to: "Ultimate Werewolf",
        created_by: "icellusedkars",
        votes: 3,
        created_at: 1610964545410,
      },
      {
        body: "I didn't know dogs could play games",
        belongs_to: "Ultimate Werewolf",
        created_by: "butter_bridge",
        votes: 10,
        created_at: 1610964588110,
      },
    ];
    const inputCopy = [
      {
        body: "My dog loved this game too!",
        belongs_to: "Ultimate Werewolf",
        created_by: "icellusedkars",
        votes: 3,
        created_at: 1610964545410,
      },
      {
        body: "I didn't know dogs could play games",
        belongs_to: "Ultimate Werewolf",
        created_by: "butter_bridge",
        votes: 10,
        created_at: 1610964588110,
      },
    ];
    formatComments(input, {});
    expect(input).toEqual(inputCopy);
  });
  it("adds a game_id key, set to the correct value", () => {
    const input = [
      {
        body: "My dog loved this game too!",
        belongs_to: "Ultimate Werewolf",
        created_by: "icellusedkars",
        votes: 3,
        created_at: 1610964545410,
      },
    ];
    const refObj = { "Ultimate Werewolf": 1 };
    const output = formatComments(input, refObj);
    expect(output[0].game_id).toEqual(1);
  });
  it("fully formats an array of comments", () => {
    const input = [
      {
        body: "My dog loved this game too!",
        belongs_to: "Ultimate Werewolf",
        created_by: "icellusedkars",
        votes: 3,
        created_at: 1610964545410,
      },
      {
        body: "I loved this game too!",
        belongs_to: "Jenga",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    const refObj = { "Ultimate Werewolf": 1 , Jenga: 2};
    const output = [
      {
        game_id: 1,
        body: "My dog loved this game too!",
        author: "icellusedkars",
        votes: 3,
        created_at: new Date(1610964545410),
      },
      {
        game_id: 2,
        body: "I loved this game too!",
        author: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389),
      },
    ];
    expect(formatComments(input, refObj)).toEqual(output);
  });
});
