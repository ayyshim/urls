module.exports = {
  mongodb_url: process.env.mongodb_url || "mongodb://localhost:27017/urls",
  port: process.env.PORT || 4000,
  host: process.env.host || "http://localhost:4000/"
};
