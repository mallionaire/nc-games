const db = require('./connection');

const createTables = async () => {
  const categoriesTablePromise = db.query(`
  CREATE TABLE categories (
    slug VARCHAR PRIMARY KEY,
    description VARCHAR NOT NULL
  );`);

  const usersTablePromise = db.query(`
  CREATE TABLE users (
    username VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    avatar_url VARCHAR
  );`);

  await Promise.all([categoriesTablePromise, usersTablePromise]);

  await db.query(`
  CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    category VARCHAR NOT NULL REFERENCES categories(slug),
    owner VARCHAR NOT NULL REFERENCES users(username),
    review_body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    votes INT DEFAULT 0 NOT NULL,
    designer VARCHAR NOT NULL,
    review_img_url TEXT NOT NULL
  );`);

  await db.query(`
  CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    review_id INT REFERENCES reviews(review_id) ON DELETE CASCADE NOT NULL,
    author VARCHAR REFERENCES users(username) NOT NULL,
    votes INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );`);
};

const dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS categories;`);
};

module.exports = { createTables, dropTables };
