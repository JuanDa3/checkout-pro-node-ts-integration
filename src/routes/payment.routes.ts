import * as express from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = express.Router();
const paymentController = new PaymentController();

router.post('/', (req, res) => {
    paymentController.createPreference(req, res);
});

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});

router.post('/webhook/mercadopago', (req, res) => {
    paymentController.webhook(req, res);
});

export default router;