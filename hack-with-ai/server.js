const PORT = 8000;
const express = require('express');
const cors = require('cors'); // rid of ew block messages
const app = express(); // it releases the methods and stuff
app.use(cors());
app.use(express.json());
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

//notice /gemini location, request and response
app.post('/gemini', async (req, res) => {
    //console.log(req.body.history);
    //console.log(req.body.message);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
        history: req.body.history
    });
    //console.log("Helloi");
    const msg = req.body.message;
    //console.log("Helloi");
    const result = await chat.sendMessage(msg); // add it to the chat, Promise!
    //console.log("Helloi");
    const response = await result.response;
    //console.log("Helloi");
    const text = response.text();
    //console.log("Helloi");
    res.send(text); // send it back to front'end
})

// callback function
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));