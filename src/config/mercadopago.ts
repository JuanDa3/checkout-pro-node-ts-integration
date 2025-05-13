import {MercadoPagoConfig} from 'mercadopago';
require('dotenv').config();


if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  throw new Error('MERCADOPAGO_ACCESS_TOKEN environment variable is required');
}

const client = new MercadoPagoConfig({accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN});

export default client;