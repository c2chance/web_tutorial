CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname VARCHAR(32) NOT NULL,
    account VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR(32) NOT NULL
);

INSERT INTO user (nickname, account, password) VALUES ('foobar', 'foobar', 'fb7890');
INSERT INTO user (nickname, account, password) VALUES ('alice', 'alice', 'aa7890');
INSERT INTO user (nickname, account, password) VALUES ('bob', 'bob', 'bb7890');
INSERT INTO user (nickname, account, password) VALUES ('clay', 'clay', 'cc7890');
INSERT INTO user (nickname, account, password) VALUES ('dick', 'dick', 'dd7890');
INSERT INTO user (nickname, account, password) VALUES ('elon', 'elon', 'ee7890');
INSERT INTO user (nickname, account, password) VALUES ('fancy', 'fancy', 'ff7890');
INSERT INTO user (nickname, account, password) VALUES ('green', 'green', 'gg7890');
INSERT INTO user (nickname, account, password) VALUES ('hill', 'hill', 'hh7890');
INSERT INTO user (nickname, account, password) VALUES ('ian', 'ian', 'ii7890');
INSERT INTO user (nickname, account, password) VALUES ('john', 'doe', 'jd7890');
INSERT INTO user (nickname, account, password) VALUES ('keven', 'keven', 'kk7890');
INSERT INTO user (nickname, account, password) VALUES ('lolita', 'lolita', 'll7890');
INSERT INTO user (nickname, account, password) VALUES ('monica', 'monica', 'mm7890');
INSERT INTO user (nickname, account, password) VALUES ('nick', 'nick', 'nn7890');
INSERT INTO user (nickname, account, password) VALUES ('ottoman', 'otroman', 'oo7890');
INSERT INTO user (nickname, account, password) VALUES ('paai', 'paai', 'pp7890');
INSERT INTO user (nickname, account, password) VALUES ('queen', 'queen', 'qq7890');

SELECT * FROM user;

CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    position INTEGER NOT NULL
)

INSERT INTO category (label, position) VALUES ('Programming language', 1);
INSERT INTO category (label, position) VALUES ('Mobile development', 2);
INSERT INTO category (label, position) VALUES ('Web development', 3);
INSERT INTO category (label, position) VALUES ('Database', 4);
INSERT INTO category (label, position) VALUES ('Cloud computing', 5);
INSERT INTO category (label, position) VALUES ('Artifical Intelligence', 6);
INSERT INTO category (label, position) VALUES ('Block chain', 7);
INSERT INTO category (label, position) VALUES ('Ops', 8);
INSERT INTO category (label, position) VALUES ('Test', 9);
INSERT INTO category (label, position) VALUES ('Information security', 10);
INSERT INTO category (label, position) VALUES ('Embedded development', 11);
INSERT INTO category (label, position) VALUES ('iOS development', 12);
INSERT INTO category (label, position) VALUES ('Component development', 13);
INSERT INTO category (label, position) VALUES ('Markting', 14);


CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    publish_time DATETIME DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO post (category_id, title, summary, content, author_id)
  VALUES (1, 'Python vs Java', 'the post will disscus the different between python and java',
  'both lanuage is good, but...', 1)



CREATE TABLE IF NOT EXISTS comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    reply_to INTEGER,
    content TEXT NOT NULL,
    publish_time DATETIME DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO comment (post_id, author_id, reply_to, content)
  VALUES (1, 1, 1, 'both lanuage is good, but...')
  
CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) UNIQUE NOT NULL,
    color VARCHAR(255) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP
)


