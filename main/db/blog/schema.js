export default {
  tables: [
    {
      name: "users",
      fields: [
        { name: "id", pk: true, type: "serial" },
        { name: "username", type: "varchar(255)", unique: true },
        // TODO: Enforce unique on email as well
        { name: "email", type: "varchar(255)" },
        { name: "email_verified", type: "boolean" },
        { name: "last_login", type: "timestamp" },
        { name: "date_created", type: "timestamp" },
      ],
    },
    {
      name: "posts",
      fields: [
        { name: "id", pk: true, type: "serial" },
        { name: "username", type: "varchar", references: "users.username" },
        { name: "user_id", type: "integer", references: "users.id" },
        { name: "title", type: "varchar(255)" },
        { name: "body", type: "varchar" },
        { name: "like_user_id", type: "integer[]" },
        { name: "meh_user_id", type: "integer[]" },
        { name: "dislike_user_id", type: "integer[]" },
        { name: "mehmeh_user_id", type: "integer[]" },
        { name: "likes", type: "integer" },
        { name: "mehs", type: "integer" },
        { name: "dislikes", type: "integer" },
        { name: "mehmehs", type: "integer" },
        { name: "date_created", type: "timestamptz" },
      ],
    },
    {
      name: "comments",
      fields: [
        { name: "id", pk: true, type: "serial" },
        { name: "comment", type: "varchar(255)" },
        { name: "username", type: "varchar", references: "users.username" },
        { name: "user_id", type: "integer", references: "users.id" },
        // TODO: This should be parent_id with a reference to either posts.id OR comment.id
        { name: "post_id", type: "integer", references: "posts.id" },
        { name: "date_created", type: "timestamptz" },
      ],
    },
  ],
};
