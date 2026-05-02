import express from "express";
import cors from "cors";
import Replicate from "replicate";

const app = express();
app.use(cors());
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

app.post("/generate", async (req, res) => {
  try {
    const { idea } = req.body;

    const output = await replicate.run("minimax/video-01", {
      input: {
        prompt: `Create a realistic TikTok-style video of ${idea}, real people, cinematic lighting, smooth motion, social media ready`
      }
    });

    res.json({ video: output[0] });

  } catch (e) {
    res.json({ error: e.message });
  }
});

app.listen(3000, () => console.log("Server running"));