# rory-doak-coin-server
## Overview

What is your app? Brief description in a couple of sentences.

_Moné is a **financial connectivity app** which allows you to connect with your friends, see how you compare, exchange money, and connect with your personal finances._

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

1. Dashboard to see a graphical representation of your finances and the finances of your connections
2. AI enabled chatbot which takes your personal transaction data

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

- React
- Node JS
- MySQL
- React Router
- Nivo (data vis)
- Mui Core
- Knex
- Express
- OpenAI Assistants API

### How to get going

You will need an OpenAI key to begin working with the AI chat bot, this can be provided if necessary (if not already).

For the back-end, please populate the Database with provided Migration and Seed files - please run all of the migrations prior to running the Seed files.

The key for testing is for all 4 test users having an account balance, transactions, and at least 1 connection. From there you can push through.

A yearly transaction file should be provided for the assistant to run checks on how it refers to the data. Please seek assistance if this does not work

.env example: 

PORT=8080
DB_HOST=127.0.0.1
DB_NAME=<database name>
DB_USER=<mysql user>
DB_PASSWORD=<mysql password>

OPENAI_API_KEY=...
