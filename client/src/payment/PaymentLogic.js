import { makePaymentRazorpayHelper, successPaymentRazorpayHelper } from "./helper"
import toast from "react-hot-toast";
import { LoadScript } from "./loadScript";

const { RAZORPAY_KEY_ID } = process.env

export async function displayRazorpay(email) {
    const res = await LoadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }
    // create order of Razorpay from backend and get orderId and amount
    const data = await makePaymentRazorpayHelper()
    const options = {
        key: RAZORPAY_KEY_ID,
        currency: data.currency,
        amount: data.amount,
        order_id: data.orderId,
        name: 'Elevate',
        description: 'Pay your registration Fee',
        oncancel: function () {
            toast.error('payment failed')
            return false;
        },
        handler: async function () {
            // Payment Success Helper
            const res = await successPaymentRazorpayHelper(
                data.orderId,
                email
            )
            // console.log('====================================');
            // console.log(res);
            // console.log('====================================');
            if (res) {
                console.log('payment done');
                toast.success('payment Done')
                
                return true;
            }

        },
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
}

