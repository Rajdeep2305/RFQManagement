import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
  rfqID: { type: Number, unique: true, default: 0 },
  buyerEmail: { type: String, require: true },
  ContactName: { type: String, require: true },
  ContactNumber: { type: String, require: true },
  BuyerOrganizationName: { type: String, require: true },
  publishedDate: { type: Date, default: Date.now() },
  SubmissionDate: { type: Date, required: true },
  RFQProductName: { type: String, required: true },
  RFQProductDetails: { type: String, required: true },
  RFQProductSpecification: { type: String, required: true },
  RFQProductQuantity: { type: Number, required: true, default: 0 },
  UploadBOQ: { type: String, default: null },
  deliveredLocation: { type: String, default: null },
  terms: { type: String },
  assistanceBot: { type: Boolean, default: false },
  registerId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

const buyerModel =
  mongoose.models.buyer || mongoose.model("buyer", buyerSchema);

export default buyerModel;
