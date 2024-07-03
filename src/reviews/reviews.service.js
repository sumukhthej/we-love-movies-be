const db = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  return db("reviews")
      .del()
      .where({review_id: reviewId})
}

async function list(movie_id) {
  // TODO: Write your code here
  const reviews = await db(`reviews as r`)
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select('r.review_id', 'r.content', 'r.score', 'r.created_at as review_created_at', 'r.updated_at as review_updated_at', 'r.critic_id', 'r.movie_id',
          'c.critic_id as critic_critic_id', 'c.preferred_name', 'c.surname', 'c.organization_name', 'c.created_at as critic_created_at', 'c.updated_at as critic_updated_at')
      .where({movie_id: movie_id})
  return reviews.map(review => ({
    review_id: review.review_id,
    content: review.content,
    score: review.score,
    created_at: review.review_created_at,
    updated_at: review.review_updated_at,
    critic_id: review.critic_id,
    movie_id: review.movie_id,
    critic: {
      critic_id: review.critic_critic_id,
      preferred_name: review.preferred_name,
      surname: review.surname,
      organization_name: review.organization_name,
      created_at: review.critic_created_at,
      updated_at: review.critic_updated_at
    }
  }));
}

async function read(reviewId) {
  // TODO: Write your code here
  return db("reviews")
      .select("*")
      .where({review_id: reviewId})
      .first()
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
