import './App.css';
//import './server.js';
import { useState, useEffect } from 'react';

import axios from 'axios';
const cheerio = require("cheerio");
const cors = require('cors');
// const app = express(); // it releases the methods and stuff
// app.use(cors());
// const express = require('express');
// const app = express(); // it releases the methods and stuff
// app.use(cors());
//app.use(express.json());
//require('dotenv').config();
// const pretty = require("pretty");
// https://www.amazon.in/Acer-Nitro-AN515-57-i5-11400H-Graphics/product-reviews/B099ZZ13JB/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews

// const scrape = (URL, reviews) => {

  

// }



function App() {

  const [ value, setValue ] = useState("");
  //const [ URL, setURL ] = useState("");
  const [ chatHistory, setChatHistory ] = useState([]);
  const [reviews, setReviews] = useState([]);

  var URL = 'https://www.amazon.in/Acer-Nitro-AN515-57-i5-11400H-Graphics/product-reviews/B099ZZ13JB/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews';
  //var reviews = [];

  //const scrape = async () => {

  const scrapeData = async (URL) => {
    console.log(URL);
    try {
      console.log(URL);
      const { data } = await axios.get(URL);
      const $ = cheerio.load(data);
      const newReviews = [];
      $('.review').each((i, elem) => {
        const review = $(elem).find('.review-text-content span').text().trim();
        const date = $(elem).find('.review-date').text().trim();
        newReviews.push({ review, date });
      });
      console.log(newReviews);
      setReviews(newReviews); // Update state with the scraped reviews
      return reviews;
    } catch (error) {
      console.error('Error scraping data:', error);
    }
  };

    
    // axios.get(value)
    //   .then(
    //     ({ data }) => {
    //       // console.log(data);
    //       const $ = cheerio.load(data);
    //       // Extract reviews and authors from the current page
    //       $('.review').each((i, elem) => {
    //         const review = $(elem).find('.review-text-content span').text().trim();
    //         const date = $(elem).find('.review-date').text().trim();
    //         reviews.push({ review, date });
    //       });
    //       console.log(reviews);
    //       console.log('finished Scraping !');
    //       setValue(reviews);
    //       getResponse();
    //     }
    //   );
  //}

    // response function~
  const getResponse = async () => {
    if (!value) {
      // There's an error
      return;
    }

    const scrapedReviews = await scrapeData(reviews);
    //console.log(scrapedReviews);

    try {
      // send to backend
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: scrapedReviews + `
            
            Please generate a json response of the below form:
            {
              {
                'review':,
                'date':,
                'Sentiment Score':,
                'Primary Emotion':,
              }
            }
            having it's sentiment score in range of -1,1 where the closer it is to 1, the more positive it is, the closer it is to -1, the more -ve it is. 0 means it's a neutral review. Also do an emotion analysis of the review and generate what emotion is being conveyed here (Joy, surprise, sadness, disgust, fear, anger)
            `
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await fetch('http://localhost:8000/gemini', options);
      const data = await response.text();
      console.log(data);
      setChatHistory((oldChatHistory) => [...oldChatHistory, {
        role: "user",
        parts: [{ text: scrapedReviews }]
      },
      {
        role: "model",
        parts: [{ text: data }]
      }
      ]);
      setValue("");

    } catch (error) {
      console.error(error);
    }
  }

      // Clear?


      // Note: The user just posts the URL!!!!
      // From the Scraper we get
      /*
                **Request:**
          [
            {
              "review": "If you are looking for a midrange laptop for a quality gaming this may be good for you. It has been one year since I bought it and it is still performing very well as it should. It comes with Intel i5 and Nvidia GTX 1620 grafics. It has 2 SSD slots and one HDD slot. It comes with 500gb SSD pre-installed. Full HD display with 144hz refresh rate. I have played pubg pc and fortnight on the laptop and it runs excellent. I will in future try to play more powerful games. There is sound from the fan while gaming but it is not very troubling sound. The battery won't last if you are playing without pluging in the laptop and it will also affect the performance of the game. Plugin the laptop and play games for a better experience. On normal use the battery lasts about 1 hr to get from 99% to 20%. While gaming if you're not plugged in the laptop tries to save the battery and run the GPU which will affect the game and laptop performance and the battery also drains very fast. Charging speed is average. It takes about 1hr to charge from 20% to 99%. The laptop is heavy about 2.5kg. it doesn't have Microsoft office 365 free version in it. You have to go online to use it freely. The Xbox gaming pass is available free for 3 months but you have to give your debit or credit card details and activate your card for international usage. This laptop is best option for midrange gaming and acer also has an excellent service if anything happens. ",
              "date": "09-May-2024",
            },
            {
              "review": "I bought this laptop about a week a ago and it has impressed me so far! It is expensive, yes but it pays off. It has excellent performance in gaming and it has 0 lag. The i5 11th gen processer is an excellent processer, Good for students and for gaming. The webcam quality is good too. The speakers aren't the best but they do the job, Also, for those who think the speakers are bad, you can simply just put on headphones. The keyboard lighting is amazing!!! Acer nitro 5 is one of the best gaming laptops out there if you have a budget up to about 70k. One thing to keep in mind though is that it is a little thick and bulky and a little heavy but you can still carry it around. Just be careful while carrying it or you might drop. They keyboard typing keels good and the build quality is solid. Battery like is pretty good. One more advantage is that you can charge it on the back so there aren't to many wires on the sides of your laptop. Thermals are excellent too! You can also adjust fan speeds and keyboard lighting in the nitro software. Overall, I really enjoyed this laptop! I highly suggest buying it.",
              "date": "10-May-2024",
            }
          ]
      
      */

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Made by ... @Hack With AI
        </p>
        <p className = "sub-header">Powered by Gemini.</p>
      </header>
      <div className="title">
        <p className="logo">
          <span className="color1">A</span>
          <span className="color2">m</span>
          <span className="color3">a</span>
          <span className="color4">z</span>
          <span className="color5">o</span>
          <span className="color6">n</span>
          <span> </span>
          <span className="color1">R</span>
          <span className="color2">e</span>
          <span className="color3">v</span>
          <span className="color4">i</span>
          <span className="color5">e</span>
          <span className="color6">w</span>
          <span> </span>
          <span className="color1">A</span>
          <span className="color2">n</span>
          <span className="color3">a</span>
          <span className="color4">l</span>
          <span className="color5">y</span>
          <span className="color6">s</span>
          <span className="color1">i</span>
          <span className="color2">s</span>
        </p>
      </div>
      <div className = 'chat'>
        <div className = 'input-container'>
          <input
            value = {value}
            placeholder = "Enter URL"
            onChange = {(e) => setValue(e.target.value)}
            //onChange = {(e) => URL = e.target.value}
            //onChange={(e) => setURL(e.target.value)}
          />
          <button onClick = {getResponse}>Review</button>
        </div>
        <div className = 'search-result'>
          {chatHistory.map((chatItem, _index) =>
            <div key = {_index}>
              <p className = "answer">{chatItem.role} : {chatItem.parts[0].text}</p>
            </div>  
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
