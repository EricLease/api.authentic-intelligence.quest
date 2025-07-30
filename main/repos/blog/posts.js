import debug from "debug";
import { query } from "../../db/blog/datasource.js";
import processQueryResult from "../process-query-result.js";
import asCommaSeparatedList from "../../utils/as-comma-separated-list.js";
import asQueryParamSubstitutionList from "../as-query-param-substitution-list.js";

const postsDebug = debug(
  "api.authentic-intelligence.quest:server:repos:blog:posts"
);

const tableName = "posts";

const readPosts = async (httpRes) => {
  const outFields = asCommaSeparatedList([
    "id",
    "username",
    "title",
    "likes",
    "mehs",
    "dislikes",
    "mehmehs",
  ]);
  const orderByFields = asCommaSeparatedList(["date_created"]);

  const qRes = await query(
    `SELECT ${outFields} 
    FROM ${tableName} 
    ORDER BY ${orderByFields} DESC;`
  );

  processQueryResult(qRes, httpRes, postsDebug);
};

const readPost = async (httpReq, httpRes) => {
  const postId = httpReq?.query?.post_id;

  if (!postId) {
    throw new Error("getPost: Invalid httpReq.query.post_id");
  }

  const outFields = asCommaSeparatedList([
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
  ]);
  const params = [postId];

  const qRes = await query(
    `SELECT ${outFields}
    FROM ${tableName} 
    WHERE id=${asQueryParamSubstitutionList(params)};`,
    params
  );

  processQueryResult(qRes, httpRes, postsDebug);
};

export { readPosts, readPost };
