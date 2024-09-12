const Chat = require("../models/chatSchema");
const mongoose = require("mongoose");

const now = new Date();

// Format the date-time string
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
const day = String(now.getDate()).padStart(2, "0");
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const seconds = String(now.getSeconds()).padStart(2, "0");

const createdAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
const addNewMessage = async (to, from, message) => {
  try {
    const chat = new Chat({
      to,
      from,
      message,
      createdAt,
    });

    await chat.save();
  } catch (error) {
    console.log("new message not added");
  }
};

const getAllMessages = async () => {
  try {
    const allChats = await Chat.find();
    return allChats;
  } catch (error) {
    console.log("error in getting data", error);
  }
};
const getMessageById = async (id) => {
  id = id.trim();
  try {
    const chat = await Chat.findOne({ _id: id });
    return chat;
  } catch (error) {
    console.log("error in getting data", error);
  }
};

const deleteMessage = async (id) => {
  try {
    // Trim any extra spaces around the ID
    id = id.trim();

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`Invalid ID format: ${id}`);
      return null; // Indicate that the ID format is invalid
    }

    const result = await Chat.findByIdAndDelete(id);
    if (result) {
      console.log(`Message with ID ${id} deleted successfully.`);
      return result; // Return the deleted document or some confirmation
    } else {
      console.log(`Message with ID ${id} not found.`);
      return null; // Indicate that no document was found
    }
  } catch (error) {
    console.error("Error deleting message:", error); // More detailed error message
    throw error; // Optionally rethrow the error
  }
};

const updateMessage = async (id, message) => {
  id = id.trim(); // Trim any extraneous whitespace
  try {
    // Find and update the chat message by id
    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      { message }, // Update the message field
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (updatedChat) {
      console.log("Message updated successfully:", updatedChat);
      return updatedChat;
    } else {
      console.log("Chat not found with ID:", id);
      return null;
    }
  } catch (error) {
    console.error("Error updating message:", error);
    throw error; // Rethrow the error to handle it in the calling function or middleware
  }
};
module.exports = {
  addNewMessage,
  getAllMessages,
  deleteMessage,
  updateMessage,
  getMessageById,
};
