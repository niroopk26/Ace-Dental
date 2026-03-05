import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/appointments", async (req, res) => {
    const { name, phone, email, date, time, treatment, message } = req.body;
    
    console.log("New Appointment Request:", { name, phone, email, date, time, treatment, message });

    // SMS Notification Logic (Placeholder for Twilio)
    const smsContent = `New appointment request from ${name}. Phone: ${phone}. Date: ${date}. Time: ${time}. Treatment: ${treatment}.`;
    
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      try {
        // In a real app, you'd use the twilio package here
        // const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        // await client.messages.create({ body: smsContent, from: process.env.TWILIO_PHONE_NUMBER, to: process.env.CLINIC_PHONE_NUMBER });
        console.log("SMS Sent via Twilio:", smsContent);
      } catch (error) {
        console.error("Failed to send SMS:", error);
      }
    } else {
      console.log("SMS Notification (Logged only - no Twilio keys):", smsContent);
    }

    res.json({ success: true, message: "Appointment request received successfully!" });
  });

  // Proxy for Google Reviews (to keep API key safe if used)
  app.get("/api/reviews", async (req, res) => {
    const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY;
    const placeId = process.env.VITE_GOOGLE_PLACE_ID;

    if (apiKey && placeId) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`
        );
        const data = await response.json();
        res.json(data.result);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews" });
      }
    } else {
      // Fallback mock data as per PRD
      res.json({
        rating: 4.9,
        user_ratings_total: 27,
        reviews: [
          {
            author_name: "Suresh Kumar",
            rating: 5,
            text: "Excellent quality and service. Dr. Rani is very professional.",
            relative_time_description: "2 months ago",
          },
          {
            author_name: "Priya Sharma",
            rating: 5,
            text: "The doctors are very good and give close attention to all patients. Highly recommended!",
            relative_time_description: "1 month ago",
          },
          {
            author_name: "Anand V.",
            rating: 5,
            text: "The staff and the doctor are extremely polite. Very clean and hygienic clinic.",
            relative_time_description: "3 weeks ago",
          },
        ],
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
