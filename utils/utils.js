exports.formatDates = (data) => {
  return data.map(({ created_at, ...listItems }) => {
    const newItem = {
      created_at: new Date(created_at),
      ...listItems,
    };
    return newItem;
  });
};

exports.formatComments = (comments, lookupObj) => {
  const formattedComments = this.formatDates(comments);
  return formattedComments.map(
    ({ created_by, belongs_to: key, ...restOfComment }) => {
      const newComment = {
        author: created_by,
        review_id: lookupObj[key],
        ...restOfComment,
      };
      return newComment;
    }
  );
};

exports.makeRefObj = (gameReviewList) => {
  const refObj = {};
  gameReviewList.forEach((review) => {
    refObj[review.title] = review.review_id;
  });
  return refObj;
};
// game_review_id: 2,
// title: 'Jenga',
// owner: 'philippaclaire9',
// designer: 'Leslie Scott',
// review_body: 'Fiddly fun for all the family',
// category: 'Dexterity',
// created_at: 2021-01-18T10:01:41.251Z,
// votes: 5

// body: 'My dog loved this game too!',
// belongs_to: 'Ultimate Werewolf',
// created_by: 'icellusedkars',
// votes: 3,
// created_at: 1610964545410,

// comment_id: 0001
// body: 'My dog loved this game too!',
// game_id: 3
// author: 'bainesface',
// votes: 3,
// created_at: 1610964545410,
