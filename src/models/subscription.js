import mongoose, { Schema } from 'mongoose'

export const PeopleSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    frequency: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const SubscriptionSchema = new Schema({
  terms: { type: String, required: true, unique: true },
  people: { type: [PeopleSchema], default: () => [] },
})

export default mongoose.model('Subscription', SubscriptionSchema)
