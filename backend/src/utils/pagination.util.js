const pagination = (page, limit, count) => {
  const totalPages = Math.ceil(count / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  const nextPage = hasNextPage ? page + 1 : null;
  const prevPage = hasPreviousPage ? page - 1 : null;

  return {
    total_items: count,
    total_pages: totalPages,
    current_page: page,
    next_page: nextPage,
    prev_page: prevPage,
    items_per_page: limit,
    has_next_page: hasNextPage,
    has_previous_page: hasPreviousPage
  };
};

module.exports = pagination;
