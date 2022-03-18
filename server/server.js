const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'b2a75d0453c04c348e8f8af2bd861e9f',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

// Serving files using middleware (express.static)
// app.use("/", 
//     express.static(path.join(__dirname, "../public"))
// );

// Serving files using endpoints (app.get())
// When using endpoints, you need to specify the name of the file
app.get("/", (req, res) => {
    rollbar.info("We finally did it")
    rollbar.error("Oh crap here we go again")
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/js", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/main.js"));
});

app.post("/yo", (req, res) => {
    rollbar.info(`We have received ${req.body.text}`);
    res.sendStatus(200);
});

const port = process.env.PORT || 4005;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});