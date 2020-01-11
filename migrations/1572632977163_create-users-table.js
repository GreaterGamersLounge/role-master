/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable("users", {
    id: "id",
    name: { type: "varchar(1000)", notNull: true },
    discord_id: { type: "numeric", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};
