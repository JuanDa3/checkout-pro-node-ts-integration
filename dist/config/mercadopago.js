"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mercadopago_1 = require("mercadopago");
require('dotenv').config();
if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN environment variable is required');
}
const client = new mercadopago_1.MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
exports.default = client;
