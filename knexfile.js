const path = require("path");

require("dotenv").config();

const {
  DATABASE_URL = "postgresql://we_love_movies_cip7_user:T6cFNRN4RtMEbZvu9empkD7e54OKoiFp@dpg-cq2jr3dds78s73eg5dfg-a.oregon-postgres.render.com/we_love_movies_cip7?ssl=true",
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: "postgresql://we_love_movies_cip7_user:T6cFNRN4RtMEbZvu9empkD7e54OKoiFp@dpg-cq2jr3dds78s73eg5dfg-a.oregon-postgres.render.com/we_love_movies_cip7?ssl=true",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    ssl: {
      rejectUnauthorized: false // This will allow connections without requiring SSL certificates to be valid.
    }
  },

  production: {
    client: "postgresql",
    connection: "postgresql://we_love_movies_cip7_user:T6cFNRN4RtMEbZvu9empkD7e54OKoiFp@dpg-cq2jr3dds78s73eg5dfg-a.oregon-postgres.render.com/we_love_movies_cip7?ssl=true",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    ssl: {
      rejectUnauthorized: false // This will allow connections without requiring SSL certificates to be valid.
    }
  },
};
