# Arbit
This repo is a simple arbitrage generation machine using a free currency API (https://github.com/fawazahmed0/currency-api).

To use the repo for your own developer server
1. clone the project to your system and run npm install in terminal to install all the dependencies.

2. Add a .env file to the root of the porject with a line to specify your database ie.

MONGO_URI="mongodb+srv://host:\<password\>@cluster*.*******.mongodb.net/"

The line of code could be similar to the above line. The above URI is based off one given by a hosted database on the mongodb website. You are simply assigning the MONGO_URI variable to the proper URI.

3. run npm start in your terminal to boot up the server.
