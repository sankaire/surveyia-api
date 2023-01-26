import mongoose, { Schema, model } from "mongoose";

const questinare_schema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    title: { type: String, required: true },
    payaout: { type: String, required: true },
    description: { type: String, required: true },
    questions: { type: Array, required: true },
  },
  { timestamps: true }
);
const Questionare = model("Questionare", questinare_schema);
export default Questionare;
