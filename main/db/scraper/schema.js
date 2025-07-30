export default {
  tables: [
    {
      name: '"sessions"',
      fields: [
        { name: "id", pk: true, type: "uuid" },
        { name: '"description"', type: "text" },
        { name: "date_created", type: "timestamptz" },
      ],
    },
    {
      name: "pages",
      fields: [
        { name: "id", pk: true, type: "serial" },
        { name: '"url"', type: "text" },
        { name: "raw_html", type: "text" },
        { name: "metadata", type: "jsonb" },
        { name: "headers", type: "jsonb" },
        { name: "status_code", type: "integer" },
        { name: "session_id", type: "uuid", references: '"sessions".id' },
        { name: "date_created", type: "timestamptz" },
      ],
    },
    {
      name: "assets",
      fields: [
        { name: "id", pk: true, type: "serial" },
        { name: "page_id", type: "integer", references: "pages.id" },
        { name: "type", type: "text" },
        { name: "url", type: "text" },
        { name: "date_created", type: "timestamptz" },
      ],
    },
  ],
};
