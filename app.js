const express = require('express')
const bodyParser = require('body-parser')

const app = express();

const events_route = require("./routes/events")
const user_route = require("./routes/users")


app.use(bodyParser.json());

app.use("/events", events_route)
app.use("/user", user_route)

module.exports = app;