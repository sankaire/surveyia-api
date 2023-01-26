import dotenv from "dotenv";
import app from "./api";
dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Api running on ${port}`);
});
