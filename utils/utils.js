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

exports.validateSortBy = (sort_by, columns) => {
  const isValidSortByColumn = columns.includes(sort_by);
  return isValidSortByColumn
    ? sort_by
    : Promise.reject({ status: 400, msg: 'Invalid sort by query' });
};

exports.validateOrder = (order) => {
  const lowerCaseOrder = order.toLowerCase();
  const isValidOrder = ['asc', 'desc'].includes(lowerCaseOrder);
  return isValidOrder
    ? lowerCaseOrder
    : Promise.reject({ status: 400, msg: 'Invalid order query' });
};
