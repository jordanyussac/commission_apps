import express from 'express';
import commissionRoutes from './routes/commissionRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(commissionRoutes);
app.use(paymentRoutes);

app.listen(5000, () => console.log(`Server Up and Running On http://localhost:5000`));