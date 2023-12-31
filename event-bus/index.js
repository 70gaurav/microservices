import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const events = [];
app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);
  try {
    await axios.post("http://posts-clusterip-srv:4000/events", event);
  } catch (error) {
    console.error(
      "Error sending event to http://posts-clusterip-srv/events:",
      error.message
    );
  }

  try {
    await axios.post("http://comments-srv:4001/events", event);
  } catch (error) {
    console.error(
      "Error sending event to http://comments-srv/events:",
      error.message
    );
  }

  try {
    await axios.post("http://query-srv:4002/events", event);
  } catch (error) {
    console.error(
      "Error sending event to http://query-srv:4002/events:",
      error.message
    );
  }

  try {
    await axios.post("http://moderation-srv:4003/events", event);
  } catch (error) {
    console.error(
      "Error sending event to http://moderation-srv:4003/events:",
      error.message
    );
  }

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("see u at 4005");
});
