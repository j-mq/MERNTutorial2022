import express from "express";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get goals" });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    if (!req.body.text) {
      res.status(400);
      throw new Error("Please add a text field");
    }
    res.status(200).json({ message: "Set goal" });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` });
  })
);

module.exports = router;
