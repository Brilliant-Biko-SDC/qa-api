DROP TABLE IF EXISTS questions, answers, photos CASCADE;

CREATE TABLE questions (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  date_written BIGINT,
  asker_name TEXT,
  asker_email TEXT,
  helpful SMALLINT DEFAULT 0,
  reported BOOLEAN DEFAULT false
);

CREATE TABLE answers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  question_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  date_written BIGINT,
  answerer_name TEXT,
  answerer_email TEXT,
  helpful SMALLINT DEFAULT 0,
  reported BOOLEAN DEFAULT false
);

CREATE TABLE photos (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  answer_id INTEGER NOT NULL,
  url TEXT
);

COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/chrispak/Downloads/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/chrispak/Downloads/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, answer_id, url)
FROM '/Users/chrispak/Downloads/answers_photos.csv'
DELIMITER ','
CSV HEADER;

ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (id);

ALTER TABLE photos ADD FOREIGN KEY (answer_id) REFERENCES answers (id);

ALTER TABLE questions ALTER COLUMN date_written TYPE TIMESTAMPTZ USING to_timestamp(date_written/1000);

ALTER TABLE answers ALTER COLUMN date_written TYPE TIMESTAMPTZ USING to_timestamp(date_written/1000);

CREATE INDEX idx_product_id ON questions(product_id);

CREATE INDEX idx_question_id ON answers(question_id);

CREATE INDEX idx_answer_id ON photos(answer_id);

SELECT setval(pg_get_serial_sequence('questions', 'id'), coalesce(max(id)+1, 1), false) FROM questions;

SELECT setval(pg_get_serial_sequence('answers', 'id'), coalesce(max(id)+1, 1), false) FROM answers;

SELECT setval(pg_get_serial_sequence('photos', 'id'), coalesce(max(id)+1, 1), false) FROM photos;