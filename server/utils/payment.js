import paymentData from '../data/paymentData.json' assert { type: 'json' };

const payment = (sale_id) => {
    return paymentData.filter(payment => payment.sale_id === sale_id).reduce((total, payment) => total + payment.installment_amount, 0);
};

export default payment;