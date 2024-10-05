import express, { Application, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

const app: Application = express();
app.use(morgan("dev"));

app.get("/", async (_req: Request, res: Response) => {
  const SECRET_KEY = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${SECRET_KEY}`;
  const response = await axios.post(
    url,
    {
      contents: [
        {
          parts: [
            {
              text: "Teach about phrasal verbs. Which are the most common phrasal verbs used? ",
            },
          ],
        },
      ],
    },
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  const textPart = response.data.candidates[0].content.parts[0].text;

  res.send(textPart);
  // res.send("<h1 style='color: #009688'>hello world</h1>");
});

app.listen(8000, () => {
  console.log("Server is running on: http://localhost:8000.");
});
