const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

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

//get username
app.get('/getusername', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }
    const username = user.username;
    res.status(200).json({ username });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send('Invalid token');
    }
    res.status(500).send('Error fetching username');
  }
});

// Proxy route for fetching OAuth token
app.post("/get-token", async (req, res) => {
  try {
    const clientID = "7923bb89015b44aebcaa124a7e2531a6";
    const clientSecret = "4a3a20a67942462bae8b99556eac4fbb";

    const response = await axios.post("https://oauth.fatsecret.com/connect/token", {
      grant_type: "client_credentials",
      scope: "premier",
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
    const url = `https://platform.fatsecret.com/rest/server.api?method=foods.search.v3&search_expression=${foodName}&format=json&include_food_images=true&max_results=50`;
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
  const { recipeName } = req.body;
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
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Diet Plan Gemini Api
const genAI = new GoogleGenerativeAI("AIzaSyDp-tmArVcZ9EcHdowr0Xe-2it1Yb8Zv2s");

app.post('/generate-diet-plan', async (req, res) => {
    const { currentWeight, height, idealWeight, userId } = req.body;

    const bmi = (currentWeight / (height * height)) * 10000;
    const nbmi = (idealWeight / (height * height)) * 10000;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Current BMI: ${bmi}\n\nGoal BMI: ${nbmi}\n\nCalorie Deficit Required: Between 500-750 calories per day\n\nDiet Plan\n\nBreakfast\n- Oatmeal with berries and nuts (1 cup oatmeal, 1/2 cup berries, 1/4 cup nuts)\n- Greek yogurt with fruit and granola (1 cup yogurt, 1/2 banana, 1/4 cup granola)\n- Whole-wheat toast with avocado and eggs (2 slices toast, 1/2 avocado, 2 eggs)\n\nLunch\n- Salad with grilled chicken, vegetables, and quinoa (1 cup salad mix, 1/2 cup grilled chicken, 1 cup vegetables, 1/2 cup quinoa)\n- Sandwich on whole-wheat bread with lean protein, vegetables, and low-fat cheese (2 slices bread, 1/4 cup protein, 1 cup vegetables, 1/4 cup cheese)\n- Leftovers from dinner\n\nDinner\n- Grilled salmon with roasted vegetables (4 ounces salmon, 1 cup roasted vegetables)\n- Vegetarian chili with whole-wheat bread (1 bowl chili, 1 slice bread)\n- Chicken stir-fry with brown rice (1 cup stir-fry, 1/2 cup brown rice)\n\nSnacks\n- Fruits (apple, banana, orange)\n- Vegetables (carrots, celery, cucumbers)\n- Air-popped popcorn\n- Nuts (1/4 cup)\n\nHydration\n- Drink plenty of water throughout the day\n- Avoid sugary drinks\n\nAdditional Tips\n- Cook meals at home more often to control calorie intake\n- Read food labels carefully and choose foods low in calories and fat\n- Limit processed foods, sugary snacks, and unhealthy fats\n- Exercise regularly\n- Consult a registered dietitian or your healthcare provider for personalized guidance\n\nNote: This is just a sample diet plan, and individual needs may vary. Adjust caloric intake and food choices as needed to achieve a calorie deficit of 500-750 calories per day.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();

        text = text.replace(/\*\*/g, '');

        const lines = text.split('\n');

        res.json({ dietPlan: lines });
    } catch (error) {
        console.error("Error generating diet plan:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
