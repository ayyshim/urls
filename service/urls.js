const URL = require("../model/urls");
const url_id = require("../helper/url_id");
const { host } = require("../config");

exports.add = async (_link, id = null) => {
  let newURL = new URL({
    link: _link
  });

  if (id) {
    newURL._id = id.split(" ").join("_");
  } else {
    newURL._id = await generateCleanURL();
  }

  await newURL.save();
  return host + newURL._id;
};

exports.get = async _id => {
  const url = await URL.findOne({ _id });

  if (url) {
    return url._doc.link;
  } else {
    return false;
  }
};

generateCleanURL = async () => {
  while (true) {
    let id = url_id.generate();

    const url = await URL.findOne({ _id: id });
    if (!url) {
      return id;
    }
  }
};
