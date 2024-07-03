const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const movie_id = parseInt(request.params.movieId);
  const movie = await service.read(movie_id);
  if(movie !== undefined) {
    response.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `Movie cannot be found.`
  });
}

async function read(request, response) {
  // TODO: Add your code here
  response.status(200).json({data: response.locals.movie})
}

async function list(request, response) {
  // TODO: Add your code here.
  const {is_showing = 'false' } = request.query;
  service.list(is_showing)
      .then((data) => response.status(200).json({data}))
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read]
};
