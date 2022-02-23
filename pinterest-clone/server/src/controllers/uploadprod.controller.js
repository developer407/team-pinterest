const express = require("express");

const Product = require("../models/uploadprod.model");

const { uploadSingle, uploadMultiple } = require("../middlewares/upload");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    return res.send(products);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/single", uploadSingle("image_urls"), async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      tag: req.body.tag,
      image_urls: req.file.path,
    });

    return res.send({ product });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/multiple", uploadMultiple(2, "image_urls"), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => file.path);

    const product = await Product.create({
      name: req.body.name,
      tag: req.body.tag,
      image_urls: filePaths,
    });

    return res.send({ product });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
