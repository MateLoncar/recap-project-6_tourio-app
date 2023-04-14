import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const places = await Place.find();
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ error: "Error getting places from database" });
    }
  } else if (req.method === "POST") {
    const { name, description } = req.body;
    try {
      const newPlace = await Place.create({ name, description });
      res.status(201).json(newPlace);
    } catch (error) {
      res.status(500).json({ error: "Error adding place to database" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
