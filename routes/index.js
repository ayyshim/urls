const Router = require("express").Router();
const URLService = require("../service/urls");
const { host } = require("../config");

var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
var regex = new RegExp(expression);

Router.get("/", (req, res) => {
  res.render("home", {
    buttonText: "Generate URL"
  });
});

Router.post("/", async (req, res) => {
  const url = req.body.url;

  let result = false;
  let error = null;
  let generatedURL = null;
  if (!url || url.trim().length === 0) {
    error = "URL can not be empty.";
  } else if (!url.match(regex)) {
    error = "Invalid URL";
  }
  if (!error) {
    generatedURL = await URLService.add(url);
    result = true;
  }

  res.render("home", {
    buttonText: "Generate URL",
    result,
    error,
    url: generatedURL,
    originalURL: url
  });
});

Router.get("/:id", async (req, res) => {
  const link = await URLService.get(req.params.id);

  if (link) {
    return res.redirect(link);
  } else {
    res.render("home", {
      buttonText: "Assign URL",
      result: true,
      url: host + req.params.id.split(" ").join("_")
    });
  }
});

Router.post("/:id", async (req, res) => {
  const url = req.body.url;
  const id = req.params.id.split(" ").join("_");
  let result = true;
  let error = null;
  let assigned = false;
  let generatedURL = host + id;
  if (!url || url.trim().length === 0) {
    error = "URL can not be empty.";
  } else if (!url.match(regex)) {
    error = "Invalid URL";
  }
  if (!error) {
    generatedURL = await URLService.add(url, id);
    assigned = true;
  }

  res.render("home", {
    buttonText: "Assign URL",
    result,
    error,
    assigned,
    url: generatedURL,
    originalURL: url
  });
});

module.exports = Router;
