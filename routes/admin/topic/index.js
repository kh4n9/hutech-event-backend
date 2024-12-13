const router = require("express").Router();
const Topic = require("../../../models/Topic");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const topic = await Topic.findOne({ name });
    if (topic) {
      return res.status(400).send("Topic already exists");
    }
    const newTopic = new Topic({ name });
    await newTopic.save();
    res.send(newTopic);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.send(topics);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).send("Topic not found");
    }
    res.send(topic);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).send("Topic not found");
    }
    // kiểm tra xem topic đã tồn tại chưa ngoại trừ id của topic đó ra
    const isExist = await Topic.findOne({ name, _id: { $ne: req.params.id } });
    if (isExist) {
      return res.status(400).send("Topic already exists");
    }
    topic.name = name;
    await topic.save();
    res.send(topic);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) {
      return res.status(404).send("Topic not found");
    }
    res.send(topic);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
