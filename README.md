# Hack with AI: Amazon Review Analyst

This project was made by Kabiirk, Ian, and Jose

![image](https://github.com/josecr02/Hack-With-AI-2024/assets/88961639/37cc28d2-8782-40fe-b531-68658578bfd3)


# Inspiration
In today's world, people are constantly buying from Amazon online. There are countless of products that consumers can choose from, and sometimes there are products that adjust more than others to the consumer's needs. In some cases, some have a lot of reviews and it may be difficult for the user to go through all of them!

# What it does
Our Amazon Review Analyst is very simple it to use: the user inputs the URL of the product, which we don't transmit to our web scraper and outputs the 'review' and 'date' of each review. We then send that output to the Gemini API with a few specifications of how we want the format. Then we receive the sentiment score and data from Gemini and we then use it to plot the data on nice graphics.

# How we built it
For the front-end, we started a new React project. For the Back-end, we used Node.js to connect to the Gemini API via SDK and do the requests through there. On top of that, for the Web Scraper we used Axios and Cheerios.

# Challenges we ran into
We ran it a lot of challenges:

Running into errors while Web Scraping
Not being able to visualize the data correctly
Front-end basic problems 

# Accomplishments that we're proud of
We got the Gemini API working!
Usable Front-end
Being able to handle api calls while web-scrapping (this caused us conflict for a while)
Follow good coding practices and understand Google's AI Studio Documentation ## What we learned We learned how to use Google's Gemini API and connect it with Node.js. We also learned some more front-end which also comes in handy. Furthermore, we've learned that Sentiment Analysis is a very powerful tool that can be used for going above and beyond on text evaluations. Instead of limiting to 5 stars like in Amazon, we can produce a visual representation of what the people that have bought the product feel. ## What's next for Sentylitics We've had some ideas for improvement. It could be made into a Google Chrome Extension, and we can also provide it as a tool for companies for their own products.
