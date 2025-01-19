import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  VendorID: { type: Number, unique: true, default: 0 },
  VendorName: { type: String, required: true },
  VendorEmail: { type: String, required: true },
  VendorMobile: { type: String, required: true },
  productName: { type: String, required: true }, 
  productDetails: { type: String, required: true },
  productSpecification: { type: String, required: true },
  rating: { type: Number, default: 5 },
  assistanceBot: { type: Boolean, default: false },
  address: { type: String, required: true },
  registerId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

const vendorModel =
  mongoose.models.vendor || mongoose.model("vendor", vendorSchema);

export default vendorModel;
