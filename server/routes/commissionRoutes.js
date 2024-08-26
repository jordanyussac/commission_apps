import express from 'express';
import marketingData from '../data/marketingData.json' assert { type: 'json' };
import sellingData from '../data/sellingData.json' assert { type: 'json' };
import calculateCommission from '../utils/calculateCommission.js';

const router = express.Router();

router.get('/commission', (req, res) => {
    const result = {};

    sellingData.forEach((sale) => {
        const { marketing_id: marketingId, date, total_balance: omzet } = sale;
        const name = marketingData[marketingId];
        const saleDate = new Date(date);
        const month = saleDate.toLocaleString('default', { month: 'long' });

        if (!result[name]) {
            result[name] = {};
        }

        if (!result[name][month]) {
            result[name][month] = 0;
        }

        result[name][month] += omzet;
    });

    const commissionData = Object.entries(result).flatMap(([name, months]) =>
        Object.entries(months).map(([month, omzet]) => {
            const { percentage, commission } = calculateCommission(omzet);

            return {
                Marketing: name,
                Bulan: month,
                Omzet: omzet,
                "Komisi %": percentage,
                "Komisi Nominal": commission,
            };
        })
    );
    res.json(commissionData);
});

router.get('/sellingData', (req, res) => {
    res.json(sellingData);
})

export default router;