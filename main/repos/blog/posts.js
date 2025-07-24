const debug = require("debug")(
  "api.authentic-intelligence.quest:server:repos:blog:posts"
);
const dbBlog = require("../../db/blog/datasource");
const { asSelectList, processQueryResult } = require("../utils");

const getPosts = async (httpRes) => {
  const qRes = await dbBlog.query(
    `SELECT ${asSelectList([
      "id",
      "username",
      "title",
      "likes",
      "mehs",
      "dislikes",
      "mehmehs",
    ])} 
    FROM posts 
    ORDER BY date_created DESC;`
  );

  processQueryResult(qRes, httpRes, debug);
};

const getPost = async (httpReq, httpRes) => {
  const postId = httpReq?.query?.post_id;

  if (!postId) {
    throw new Error("getPost: Invalid httpReq.query.post_id");
  }

  const qRes = await dbBlog.query(
    `SELECT ${asSelectList([
      "id",
      "username",
      "user_id",
      "title",
      "body",
      "like_user_id",
      "meh_user_id",
      "dislike_user_id",
      "mehmeh_user_id",
      "likes",
      "mehs",
      "dislikes",
      "mehmehs",
      "date_created",
    ])}
    FROM posts 
    WHERE id=$1;`,
    [postId]
  );

  processQueryResult(qRes, httpRes, debug);
};

module.exports = {
  getPosts,
  getPost,
};
