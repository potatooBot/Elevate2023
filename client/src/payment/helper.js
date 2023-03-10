import axios from "axios";

// Make Payment with Razorpay (Create Order)
export const makePaymentRazorpayHelper = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const { data } = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/payment/razorpay/init`, config);
    return data;
};

// Success Payment
export const successPaymentRazorpayHelper = async (orderId, email) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = {
        orderId: orderId,
        email: email
    };
    const { data } = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/payment/razorpay/success`, body, config);
    return data;
};
