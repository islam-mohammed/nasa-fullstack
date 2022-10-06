function getPagination(query) {
  const limit = Math.abs(query?.limit || 50);
  const page = Math.abs(query?.page || 1);
  const skip = limit * (page - 1);
  return {
    limit,
    skip,
  };
}
module.exports = {
  getPagination,
};
