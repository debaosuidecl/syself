export const SERVER_PORT =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:2900"
    : "https://mysterious-citadel-13326.herokuapp.com";
