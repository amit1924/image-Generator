// import express from "express";
// import fs from "fs";
// import fetch from "node-fetch";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const app = express();
// const PORT = 3000;

// // Get the current directory in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Middleware to serve static files from the 'public' directory
// app.use(express.static("public"));
// app.use(express.json());

// // Function to download an image and save it to the 'downloads' folder
// async function downloadImage(imageUrl, filename) {
//   const downloadsDir = path.join(__dirname, "downloads");

//   // Create the downloads directory if it doesn't exist
//   if (!fs.existsSync(downloadsDir)) {
//     fs.mkdirSync(downloadsDir);
//   }

//   const filePath = path.join(downloadsDir, filename);
//   const response = await fetch(imageUrl);
//   const buffer = await response.buffer();
//   fs.writeFileSync(filePath, buffer);
//   console.log(`Download Completed: ${filePath}`);
// }

// app.get("/", (req, res) => {
//   res.send("server is running...");
// });

// // Route to handle image generation based on user input
// app.post("/generate-image", async (req, res) => {
//   const { prompt, width, height, seed, model } = req.body;
//   const filename = `image_${Date.now()}.png`;

//   try {
//     const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
//       prompt
//     )}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

//     await downloadImage(imageUrl, filename);

//     // Send the image URL back to the client
//     res.status(200).json({ imageUrl: `/downloads/${filename}` });
//   } catch (error) {
//     console.error("Error generating image:", error);
//     res.status(500).json({ error: "Image generation failed" });
//   }
// });

// // Serve the downloaded images from the /downloads folder
// app.use("/downloads", express.static(path.join(__dirname, "downloads")));

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// import express from "express";
// import fetch from "node-fetch";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import cors from "cors";

// const app = express();
// const PORT = 3000;
// app.use(
//   cors({
//     origin: "https://ai-image-generator-amit1924-amit1924s-projects.vercel.app", // Replace with your frontend URL
//     methods: ["GET", "POST"], // Allow specific methods
//     credentials: true, // Allow credentials if needed
//   })
// );

// // Get the current directory in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Middleware to serve static files from the 'public' directory
// app.use(express.static("public"));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("server is running...");
// });

// // Route to handle image generation based on user input
// app.post("/generate-image", async (req, res) => {
//   const { prompt, width, height, seed, model } = req.body;

//   try {
//     const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
//       prompt
//     )}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

//     // Send the image URL back to the client without downloading
//     res.status(200).json({ imageUrl });
//   } catch (error) {
//     console.error("Error generating image:", error);
//     res.status(500).json({ error: "Image generation failed" });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

import express from "express";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Route to handle image generation based on user input
app.post("/generate-image", async (req, res) => {
  const { prompt, width, height, seed, model } = req.body;

  // Validate input data
  if (!prompt || !width || !height || !seed || !model) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
      prompt
    )}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

    // Just return the image URL
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res
      .status(500)
      .json({ error: "Image generation failed: " + error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
