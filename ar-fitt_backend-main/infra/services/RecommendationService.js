import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import { EnvironmentVariables } from "../config/environment/EnvironmentVariables.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazily construct the client so importing this module doesn't throw when the
// key is absent (the SDK validates the key at construction time).
let client;
const getClient = () => {
  if (!client) {
    client = new OpenAI({ apiKey: EnvironmentVariables.OPENAI_API_KEY });
  }
  return client;
};

// Read & encode the products CSV once at module load (matching the previous
// Python service, which encoded it a single time at startup).
const csvPath = path.join(__dirname, "data", "products_arfit.csv");
const encodedCsv = fs.readFileSync(csvPath).toString("base64");

// Same prompt the Flask service used, so the "Size =" / "Recommended shirt
// colors =" / "Recommended shirts =" parsing in the controller keeps working.
const buildPromptText = () =>
  "You will be given an image of a person and a CSV file (base64-encoded) with ecommerce product data. " +
  "Your task is to do the following:\n\n" +
  "1) Analyze the image and determine the person's clothing size (e.g., S, M, L, XL, etc.) and skin tone.\n" +
  "2) Recommend the best shirt colors for this person.\n" +
  "3) Decode the provided CSV data (which contains product details such as ID, product_name, color, available_sizes, etc.) " +
  "and identify the products (by ID and product_name, available_sizes) that match the person's recommended size .\n\n" +
  "4) Do not include any additional explanations or commentary.\n\n" +
  "5) Output your final answer exactly in the following format (each line must be on a new line with no extra text):\n\n" +
  "Size = <recommended size>\n" +
  "Skin tone = <determined skin tone>\n" +
  "Recommended shirt colors = <comma-separated list of colors>\n" +
  "Recommended shirts = <comma-separated list of product IDs>\n\n" +
  "CSV Data (base64-encoded):\n" +
  encodedCsv;

/**
 * Given a base64-encoded body image, ask OpenAI for size / colour / shirt
 * recommendations and return the raw text reply (same shape the Flask
 * `/recommend` endpoint used to return in `recommendations`).
 *
 * @param {string} base64Image base64 image string, with or without a data URL prefix
 * @returns {Promise<string>} the model's text reply
 */
export async function getRecommendations(base64Image) {
  if (!base64Image) {
    throw new Error("No image provided.");
  }

  // Strip a data URL prefix if present, then validate it decodes.
  let imageData = base64Image;
  if (imageData.startsWith("data:image")) {
    imageData = imageData.split(",", 2)[1];
  }
  const imageBuffer = Buffer.from(imageData, "base64");
  if (imageBuffer.length === 0) {
    throw new Error("Invalid Base64 image.");
  }
  const imageDataUrl = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  const promptText = buildPromptText();

  const response = await getClient().chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: promptText },
          { type: "image_url", image_url: { url: imageDataUrl } },
          { type: "text", text: "CSV Data (base64-encoded): " + encodedCsv },
        ],
      },
    ],
  });

  const reply = response?.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error("No valid response from the model.");
  }
  return reply;
}
