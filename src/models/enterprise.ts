import {Document, model, schema} from "mongoose"; 
import { IEnterprise } from "../interfaces/IEnterprise";


const Enterprise = new Schema(
    {
      name: { type: String, required: true },
      date: { type: Date, required: true },
      type: { type: String, required: true },
      token: { type: String, default: null }, // Opcional
      password: { type: String, required: true, maxlength: 120 },
      comments: { type: String, required: true },
      favorite: { type: String, required: true, unique: true },
      session_active: Boolean
    },
    { timestamps: true }
  );