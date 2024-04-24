const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection string
const mongoURI = "mongodb://localhost:27017/Fitfuel";
mongoose.connect(mongoURI);

// User model
const UserSchema = new mongoose.Schema({
  username: String,
  age: Number,
  height: Number,
  weight: Number,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// Token model
const TokenSchema = new mongoose.Schema({
  access_token: String,
});
const Token = mongoose.model("Token", TokenSchema);

// Middleware for token verification
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).send("A token is required for authentication");
  try {
    req.user = jwt.verify(token.split(" ")[1], "YOUR_SECRET_KEY");
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

// Register user
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const user = new User({
            username: req.body.username,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
            password: hashedPassword
        });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, "YOUR_SECRET_KEY");
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error during login");
  }
});

// Proxy route for fetching OAuth token
app.post("/get-token", async (req, res) => {
  try {
    const clientID = "7923bb89015b44aebcaa124a7e2531a6";
    const clientSecret = "4a3a20a67942462bae8b99556eac4fbb";

    const response = await axios.post("https://oauth.fatsecret.com/connect/token", {
      grant_type: "client_credentials",
      scope: "basic",
    }, {
      auth: {
        username: clientID,
        password: clientSecret
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const token = response.data.access_token;

    await Token.findOneAndUpdate({}, { access_token: token }, { upsert: true });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching token");
  }
});

// Route to fetch food Api data
app.post('/get-foods', async (req, res) => {
  const { foodName } = req.body;
  try {
    const { access_token } = await Token.findOne({});
    const url = `https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=${foodName}&format=json&max_results=50`;
    const response = await axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
});

// Route to fetch recipes Api data
app.post('/get-recipes', async (req, res) => {
  const recipeName = req.body;
  try {
    const { access_token } = await Token.findOne({});
    const url = `https://platform.fatsecret.com/rest/server.api?method=recipes.search.v3&search_expression=${recipeName}&format=json&max_results=50`;
    const response = await axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
