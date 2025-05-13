import express from 'express';
import cors from 'cors';
import paymentRouter from './routes/payment.routes'; 

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/payment', paymentRouter);

export default app;