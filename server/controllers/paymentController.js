import Razorpay from "razorpay";
import paymentModel from "../model/PaymentModel.js";
import ENV from '../config.js'

const razorpay = new Razorpay({
    key_id: ENV.RAZORPAY_KEY_ID,
    key_secret: ENV.RAZORPAY_KEY_SECRET,
});

/**
* @description start a razorpay payment
* @route POST /api/payment/razorpay/init
*/

export const initPayment = async (req, res) => {
    try {
        const options = {
            amount: 100 * 100,
            currency: "INR",
        };

        const response = await razorpay.orders.create(options);
        console.log(response);
        res.status(200).json({
            success: true,
            message: "Payment initiated",
            orderId: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @description finalize a razorpay payment
 * @route POST /api/payment/razorpay/success
 */
export const paymentSuccess = async (req, res) => {
    const { orderId, email } = req.body;

    try {
        const orderDetails = await razorpay.orders.fetch(orderId);

        console.log("====================================");
        console.log(orderDetails);
        console.log("====================================");

        // create payment model
        if (orderDetails) {
            const createPayment = await paymentModel.create({
                userEmail: email,
            });
            res.status(200).json({
                success: true,
                message: "Payment success",
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Payment Not done ",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};