import { Schema, model, models } from "mongoose";

const sellSchema = new Schema({
  Category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  no_of_owners: {
    type: String,
    required: true,
  },
  year_owned: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  seller_name: {
    type: String,
    required: true,
  },
  seller_address: {
    type: String,
    required: true,
  },
  seller_phone: {
    type: String,
    required: true,
  },
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

const itemsForSale = models.sellingItems || model("sellingItems", sellSchema);
export default itemsForSale;
