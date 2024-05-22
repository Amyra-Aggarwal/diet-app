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

// Route to fetch perticular recipe
app.post('/give-recipe', async (req, res) => {
  const { recipeId } = req.body;
  try {
    const { access_token } = await Token.findOne({});
    const url = `https://platform.fatsecret.com/rest/server.api?method=recipe.get.v2&recipe_id=${recipeId}&format=json`;
    const response = await axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// Diet Plan Gemini Api

const genAI = new GoogleGenerativeAI("AIzaSyDMbmUsLRcFOVDFuJXg21ZtwaoFEJ0mbhM");

// Function to generate a random meal plan
const generateRandomMealPlan = () => {
    const mealOptions = {
        breakfast: [
            'Oatmeal with berries and nuts (1 cup oatmeal, 1/2 cup berries, 1/4 cup nuts)',
            'Greek yogurt with fruit and granola (1 cup yogurt, 1/2 banana, 1/4 cup granola)',
            'Whole-wheat toast with avocado and eggs (2 slices toast, 1/2 avocado, 2 eggs)',
            'Smoothie with spinach, banana, and protein powder (300 calories)',
            'Scrambled eggs with vegetables and whole-grain toast (400 calories)',
            'Chia seed pudding with almond milk and mixed fruits (200 calories)',
            'Cottage cheese with pineapple and walnuts (300 calories)',
            'Peanut butter and banana sandwich on whole-grain bread (400 calories)',
            'Vegetable omelette with salsa and whole-grain toast (350 calories)',
            'Quinoa porridge with almond milk and sliced almonds (300 calories)',
            'Avocado toast with cherry tomatoes and feta cheese (300 calories)',
            'Blueberry pancakes with Greek yogurt and maple syrup (450 calories)',
            'Breakfast burrito with scrambled eggs, black beans, and salsa (400 calories)',
            'Whole-grain cereal with skim milk and sliced strawberries (250 calories)',
            'Banana and almond butter smoothie with flaxseeds (350 calories)',
            // Add more breakfast options here
        ],
        lunch: [
            'Salad with grilled chicken, vegetables, and quinoa (1 cup salad mix, 1/2 cup grilled chicken, 1 cup vegetables, 1/2 cup quinoa)',
            'Sandwich on whole-wheat bread with turkey, lettuce, and mustard (350 calories)',
            'Leftover stir-fry with tofu, vegetables, and brown rice (500 calories)',
            'Vegetable wrap with hummus and mixed greens (300 calories)',
            'Sushi rolls with brown rice, salmon, and avocado (450 calories)',
            'Turkey and vegetable soup with whole-grain crackers (350 calories)',
            'Quinoa salad with black beans, corn, and avocado (400 calories)',
            'Grilled chicken Caesar salad with whole-grain croutons (450 calories)',
            'Caprese salad with tomatoes, mozzarella, and basil (300 calories)',
            'Mediterranean grain bowl with falafel, couscous, and tzatziki (450 calories)',
            'Vegetable stir-fry with tofu and brown rice noodles (400 calories)',
            'Bean and vegetable chili with a side of whole-grain bread (450 calories)',
            'Pita pocket with grilled vegetables and tahini sauce (350 calories)',
            'Chicken and vegetable curry with quinoa (500 calories)',
            'Spinach and feta stuffed chicken breast with roasted potatoes (450 calories)',
            // Add more lunch options here
        ],
        dinner: [
            'Grilled salmon with roasted vegetables (450 calories)',
            'Vegetarian chili with whole-wheat bread (400 calories)',
            'Chicken stir-fry with brown rice (500 calories)',
            'Baked cod with lemon and herbs, served with steamed broccoli (400 calories)',
            'Pasta primavera with mixed vegetables and marinara sauce (400 calories)',
            'Tofu and vegetable kebabs with quinoa pilaf (450 calories)',
            'Turkey meatballs with marinara sauce and spaghetti squash (350 calories)',
            'Shrimp and vegetable stir-fry with udon noodles (450 calories)',
            'Eggplant Parmesan with a side of whole-grain pasta (400 calories)',
            'Teriyaki chicken with stir-fried vegetables and brown rice (500 calories)',
            'Vegetable lasagna with a side of mixed greens (450 calories)',
            'Beef and broccoli stir-fry with jasmine rice (450 calories)',
            'Stuffed bell peppers with lean ground turkey and quinoa (400 calories)',
            'Grilled portobello mushrooms with polenta and roasted vegetables (350 calories)',
            'Honey mustard glazed pork tenderloin with sweet potatoes (450 calories)',
            // Add more dinner options here
        ],
        snacks: [
            'Fruits (apple, banana, orange)',
            'Vegetables (carrots, celery, cucumbers)',
            'Air-popped popcorn',
            'Nuts (1/4 cup Greek yogurt with honey and almonds (150 calories)',
            'Cheese and whole-grain crackers (200 calories)',
            'Cottage cheese with sliced peaches (100 calories)',
            'Carrot and cucumber sticks with hummus (100 calories)',
            'Hard-boiled eggs (70 calories each)',
            'Apple slices with peanut butter (150 calories)',
            'Mixed berries with low-fat whipped cream (100 calories)',
            'Granola bar (150 calories)',
            'Trail mix with dried fruits and nuts (200 calories)',
            'Rice cakes with almond butter (150 calories)',
            'Dark chocolate squares (60 calories each)',
            // Add more snack options here
        ],
    };

    // Generate a random meal plan
    const randomMealPlan = {
        breakfast: getRandomItem(mealOptions.breakfast),
        lunch: getRandomItem(mealOptions.lunch),
        dinner: getRandomItem(mealOptions.dinner),
        snacks: [getRandomItem(mealOptions.snacks), getRandomItem(mealOptions.snacks)],
    };

    return randomMealPlan;
};

// Function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

app.post('/generate-diet-plan', async (req, res) => {
    const { currentWeight, height, idealWeight, userId } = req.body;

    const bmi = (currentWeight / (height * height)) * 10000;
    const nbmi = (idealWeight / (height * height)) * 10000;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
        Current BMI: ${bmi}\n\nGoal BMI: ${nbmi}\n\nCalorie Deficit Required: Between 500-750 calories per day\n\nDiet Plan\n\nBreakfast\n- ${generateRandomMealPlan().breakfast}\n\nLunch\n- ${generateRandomMealPlan().lunch}\n\nDinner\n- ${generateRandomMealPlan().dinner}\n\nSnacks\n- ${generateRandomMealPlan().snacks[0]}\n- ${generateRandomMealPlan().snacks[1]}\n\nHydration\n- Drink plenty of water throughout the day\n- Avoid sugary drinks\n\nAdditional Tips\n- Cook meals at home more often to control calorie intake\n- Read food labels carefully and choose foods low in calories and fat\n- Limit processed foods, sugary snacks, and unhealthy fats\n- Exercise regularly\n- Consult a registered dietitian or your healthcare provider for personalized guidance\n\nNote: This is just a sample diet plan, and individual needs may vary. Adjust caloric intake and food choices as needed to achieve a calorie deficit of 500-750 calories per day.`;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = await response.text();
    
            // Remove asterisks from the text
            text = text.replace(/\*/g, '');
    
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
