import express from "express";
import router from "@/router/routes";
import * as bodyParser from "body-parser";
import cors from "cors"; // Import the cors package

const app = express();
const corsOptions = {
  origin: "*"
  // credentials: true,
};

app.use(cors(corsOptions));

// Use express's built-in JSON parser with a size limit
app.use(express.json({ limit: "10mb" }));

// Use bodyParser for URL-encoded data (if needed) with a size limit
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Trust proxy if your app is behind a reverse proxy (like Nginx)
app.set("trust proxy", true);

const port = process.env.PORT || 3001; // Specify a port

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
