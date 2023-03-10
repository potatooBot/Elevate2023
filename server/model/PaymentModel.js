import mongoose from "mongoose";

export const paymentSchema = new mongoose.Schema({
    userEmail: {
        type: String,
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
})

const paymentModel = mongoose.model('PaymentReceipt', paymentSchema)
export default paymentModel;