
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 2500;

const genAI = new GoogleGenerativeAI("AIzaSyDp-tmArVcZ9EcHdowr0Xe-2it1Yb8Zv2s");

app.use(express.json());
app.use(cors());

app.post('/generate-diet-plan', async (req, res) => {
    const { currentWeight, height, idealWeight, userId } = req.body;

    // Calculate BMI
    // const bmi = currentWeight / (heightInMeters * heightInMeters);
    // const nbmi = idealWeight / (heightInMeters * heightInMeters);

    const bmi = (currentWeight / (height * height)) * 10000;
    const nbmi = (idealWeight / (height * height)) * 10000;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Current BMI: ${bmi}\n\nGoal BMI: ${nbmi}\n\nCalorie Deficit Required: Between 500-750 calories per day\n\nDiet Plan\n\nBreakfast\n- Oatmeal with berries and nuts (1 cup oatmeal, 1/2 cup berries, 1/4 cup nuts)\n- Greek yogurt with fruit and granola (1 cup yogurt, 1/2 banana, 1/4 cup granola)\n- Whole-wheat toast with avocado and eggs (2 slices toast, 1/2 avocado, 2 eggs)\n\nLunch\n- Salad with grilled chicken, vegetables, and quinoa (1 cup salad mix, 1/2 cup grilled chicken, 1 cup vegetables, 1/2 cup quinoa)\n- Sandwich on whole-wheat bread with lean protein, vegetables, and low-fat cheese (2 slices bread, 1/4 cup protein, 1 cup vegetables, 1/4 cup cheese)\n- Leftovers from dinner\n\nDinner\n- Grilled salmon with roasted vegetables (4 ounces salmon, 1 cup roasted vegetables)\n- Vegetarian chili with whole-wheat bread (1 bowl chili, 1 slice bread)\n- Chicken stir-fry with brown rice (1 cup stir-fry, 1/2 cup brown rice)\n\nSnacks\n- Fruits (apple, banana, orange)\n- Vegetables (carrots, celery, cucumbers)\n- Air-popped popcorn\n- Nuts (1/4 cup)\n\nHydration\n- Drink plenty of water throughout the day\n- Avoid sugary drinks\n\nAdditional Tips\n- Cook meals at home more often to control calorie intake\n- Read food labels carefully and choose foods low in calories and fat\n- Limit processed foods, sugary snacks, and unhealthy fats\n- Exercise regularly\n- Consult a registered dietitian or your healthcare provider for personalized guidance\n\nNote: This is just a sample diet plan, and individual needs may vary. Adjust caloric intake and food choices as needed to achieve a calorie deficit of 500-750 calories per day.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();

        // Remove asterisks and replace with an empty string
        text = text.replace(/\*\*/g, '');

        // Split the text into separate lines
        const lines = text.split('\n');

        // Send the modified response back to the client
        res.json({ dietPlan: lines });
    } catch (error) {
        console.error("Error generating diet plan:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
