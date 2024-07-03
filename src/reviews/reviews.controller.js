const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");
const {response} = require("express");

const addCritics = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
})

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  const reviewId = parseInt(request.params.reviewId)
  const result = await service.read(reviewId);
  if(result) {
    response.locals.review = result;
    return next();
  } else {
    next({
      status: 404,
      message: "Review cannot be found."
    })
  }
}

async function destroy(request, response) {
  // TODO: Write your code here
  const reviewId = parseInt(request.params.reviewId)
  await service.destroy(reviewId)
  response.sendStatus(204)
}

async function list(request, response, next) {
  // TODO: Write your code here
  const result = await service.list(parseInt(request.params.movieId))
  if(result) {
    response.json({data: result})
  }
  next({
    status: 400,
    message: 'reviews error'
  })
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // TODO: Write your code here
  const updatedReview = {
    ...response.locals.review,
    ...request.body.data,
    review_id: response.locals.review.review_id,
  }
  service
      .update(updatedReview)
      .then(data => response.status(200).json({data: data}))
}

async function read(req, res) {
  res.json({data: res.locals.review})
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
  read: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(read),
  ]
};
