/*
-- Initial dev setup
CREATE DATABASE blog;
-- postgres=# \c blog
CREATE USER blogadmin WITH PASSWORD 'authenticintelligenceblogadmin';
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO blogadmin;
*/

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  email_verified BOOLEAN,
  last_login TIMESTAMP,
  date_created TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  username VARCHAR REFERENCES users(username),
  user_id INT REFERENCES users(id),
  title VARCHAR(255),
  body VARCHAR,
  like_user_id INT[] DEFAULT ARRAY[]::INT[],
  meh_user_id INT[] DEFAULT ARRAY[]::INT[],
  dislike_user_id INT[] DEFAULT ARRAY[]::INT[],
  mehmeh_user_id INT[] DEFAULT ARRAY[]::INT[],
  likes INT DEFAULT 0,
  mehs INT DEFAULT 0,
  dislikes INT DEFAULT 0,
  mehmehs INT DEFAULT 0,
  date_created TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment VARCHAR(255),
  username VARCHAR REFERENCES users(username),
  user_id INT REFERENCES users(id),
  post_id INT REFERENCES posts(id),
  date_created TIMESTAMP
);

/*
-- Seed test data:
INSERT INTO public.users(
	username
	, email
	, email_verified
	, last_login
	, date_created
)
VALUES (
    'admin'
    , 'admin@authenticintelligence.quest'
    , TRUE
    , NOW()
    , NOW()
);

INSERT INTO public.posts(	
	username
	, user_id
	, title
	, body
	, date_created
)
VALUES (
	'admin'
	, (SELECT id FROM public.users WHERE username='admin')
	, 'first post'
	, 'this is my very first post, oh boy!'
	, NOW()
);
*/