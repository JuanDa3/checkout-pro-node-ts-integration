import * as express from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = express.Router();
const paymentController = new PaymentController();

router.post('/', (req, res) => {
    paymentController.createPreference(req, res);
});

export default router;