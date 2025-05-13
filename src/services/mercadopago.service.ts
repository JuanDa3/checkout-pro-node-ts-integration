import mercadopago from 'mercadopago';
import { PaymentRequest, PaymentResponse } from '../types/payment.types';
// import { MercadoPagoConfig } from '../config/mercadopago';

class MercadoPagoService {
    // constructor() {
    //     mercadopago.configure(MercadoPagoConfig);
    // }

    // async createPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    //     try {
    //         const payment = await mercadopago.payment.create(paymentData);
    //         return payment;
    //     } catch (error) {
    //         throw new Error(`Error creating payment: ${error.message}`);
    //     }
    // }

    // async getPayment(paymentId: string): Promise<PaymentResponse> {
    //     try {
    //         const payment = await mercadopago.payment.get(paymentId);
    //         return payment;
    //     } catch (error) {
    //         throw new Error(`Error retrieving payment: ${error.message}`);
    //     }
    // }
}

export default MercadoPagoService;