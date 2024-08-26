import express from 'express';
import paymentData from '../data/paymentData.json' assert { type: 'json' };
import payment from '../utils/payment.js';

const router = express.Router();

router.post('/payments', (req, res) => {
    const {sale_id, total_amount, installment_number, installment_amount, installment_total, payment_date } = req.body;
    if (!sale_id || !total_amount || !installment_number || !installment_amount || !installment_total || !payment_date) {
        return res.status(400).json({ 
            error: "All fields are required: sale_id, total_amount, installment_number, installment_amount, installment_total, payment_date"
        });
    }
    const currentTotalPaid = payment(sale_id);

    if (currentTotalPaid + installment_amount > total_amount) {
        return res.status(400).json({
            error: "Total paid installments exceed the total amount"
        });
    }

    const existingPayment = paymentData.find(payment => payment.sale_id === sale_id && payment.installment_number === installment_number);
    if (existingPayment) {
        return res.status(400).json({
            error: "Installment already recorded for this sale and installment number"
        });
    }

    const newPayment = {
        payment_id: paymentData.length + 1,
        sale_id,
        total_amount,
        installment_number,
        installment_amount,
        installment_total,
        payment_date
    };

    paymentData.push(newPayment);

    res.status(201).json(newPayment);
})

router.get('/payments', (req, res) => {
    res.json(paymentData);
});

export default router