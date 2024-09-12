// routes/chatRoute.js

const express = require("express");
const {
  addNewMessage,
  getAllMessages,
  deleteMessage,
  updateMessage,
  getMessageById,
} = require("../controllers/chatController");
const router = express.Router();

router.get("/chats", async (req, res) => {
  try {
    const chats = await getAllMessages();
    res.render("index.ejs", { chats });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/chats/new", (req, res) => {
  res.render("addNew.ejs");
});

router.post("/chats/new", async (req, res) => {
  const { to, from, message } = req.body;
  try {
    await addNewMessage(to, from, message);
    res.redirect("/chats");
  } catch (error) {
    console.error("Error adding new message:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/chats/delete/:id", async (req, res) => {
  try {
    await deleteMessage(req.params.id);
    res.redirect("/chats");
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/chats/update/:id", async (req, res) => {
  try {
    const chat = await getMessageById(req.params.id);
    res.render("updateChat", { chat });
  } catch (error) {
    console.error("Error fetching message for update:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/chats/update/:id", async (req, res) => {
  try {
    const { message } = req.body;
    await updateMessage(req.params.id, message);
    res.redirect("/chats");
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
