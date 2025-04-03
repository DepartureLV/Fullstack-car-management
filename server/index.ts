import express from "express";
import cors from "cors";
import carRoutes from "./src/cars/cars.routes";

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/cars", carRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
