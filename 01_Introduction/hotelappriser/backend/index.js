import express from "express";
import cors from "cors";
import { eq, sql, desc } from "drizzle-orm";
import { db } from "./db/connection.js";
import { users, hotels, hotelreviews } from "./db/schema.js";

const app = express();
app.use(cors()); // allow any origin
app.use(express.json());

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Find the user by username, or undefined if none exists.
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    const ok = user && password == user.password;

    // ONE generic message for both "no such user" and "wrong password".
    if (!ok) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Could not process request" });
  }

  res.status(200).json({ message: "Login successful" });
}

async function getHotels(req, res) {
  let hotellist;
  try {
    hotellist = await db.select().from(hotels).limit(20);

    for (const currentHotel of hotellist) {
      let hotel_rating = 0;
      const ratings = await db
        .select()
        .from(hotelreviews)
        .where(eq(hotelreviews.hotel_id, currentHotel.hotel_id));

      for (const currentRating of ratings) {
        hotel_rating += currentRating.rating;
      }

      currentHotel.rating = ratings.length === 0 ? hotel_rating : hotel_rating / ratings.length;
    }
  } catch (error) {
    return res.status(400).json({ error: "Could not process request" });
  }

  res.status(200);
  res.json(hotellist);
}

async function addReview(req, res) {
  const { hotel_id, username, reviews, rating } = req.body;

  try {
    // Find the user by username, or undefined if none exists.
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    // ONE generic message for both "no such user".
    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }

    let user_id = user.user_id;

    const [created] = await db
      .insert(hotelreviews)
      .values({ hotel_id, user_id, reviews, rating })
      .returning();

    res.status(201).json(created);
  } catch (error) {
    return res.status(400).json({ error: "Could not process request" });
  }
}

async function getReviews(req, res) {
  const { hotel_id } = req.query;

  try {
    const reviewlist = await db
      .select()
      .from(hotelreviews)
      .where(eq(hotelreviews.hotel_id, parseInt(hotel_id)));

    let reviewsArray = [];
    for (const review1 of reviewlist) {
      const [user1] = await db
        .select()
        .from(users)
        .where(eq(users.user_id, review1.user_id));

      reviewsArray.push({
        hotel_id: review1.hotel_id,
        username: user1.username,
        hotel_review: review1.reviews,
        hotel_rating: review1.rating,
      });
    }

    res.status(200);
    res.json(reviewsArray);
  } catch (error) {
    return res.status(400).json({ error: "Could not process request" });
  }
}

async function getHotelImage(req, res) {
  const { hotel_id } = req.query;

  try {
    // 1. Fetch your hotel record from the database
    const [hotel1] = await db
      .select()
      .from(hotels)
      .where(eq(hotels.hotel_id, parseInt(hotel_id)));

    // 2. Ensure your binary data is a Node.js Buffer
    // Most DB drivers return BLOBs/Varbinary as a Buffer automatically.
    // If it's an array or a raw binary string, wrap it: Buffer.from(hotel1.image)
    //const imageBuffer = Buffer.from(hotel1.image);

    // 3. Set the appropriate Content-Type header
    res.setHeader("Content-Type", "image/jpg"); // or image/png, etc.

    // 4. Send the buffer as the response body.
    // If you wrapped up with Buffer, use:
    // res.send(imageBuffer);
    res.send(hotel1.image);
  } catch (error) {
    return res.status(400).json({ error: "Could not process request" });
  }
}

app.post("/login", login);
app.get("/hotels", getHotels);
app.post("/addReview", addReview);
app.get("/reviews", getReviews);
app.get("/hotelimage", getHotelImage);

app.listen(3000, () =>
  console.log("hotelappriser API on http://localhost:3000"),
);
