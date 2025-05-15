"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const mercadopago_1 = require("mercadopago");
const mercadopago_2 = __importDefault(require("../config/mercadopago"));
class PaymentController {
    createPreference(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let items = [];
                if (req.body.items && Array.isArray(req.body.items)) {
                    // Case: Request contains an items array
                    items = req.body.items;
                }
                else if (req.body.id && req.body.title && req.body.unit_price) {
                    // Case: Request contains a single item directly
                    items = [req.body];
                }
                else {
                    return res.status(400).json({
                        message: "Invalid request: items must be provided as an array or a single item object",
                    });
                }
                // Ensure all items have the required properties
                const validItems = items.map((item) => {
                    var _a;
                    return ({
                        id: ((_a = item.id) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                        title: item.title || "",
                        description: item.description || "",
                        picture_url: item.picture_url || "",
                        category_id: item.category_id || "",
                        quantity: item.quantity || 1,
                        currency_id: item.currency_id || "USD",
                        unit_price: Number(item.unit_price) || 0,
                    });
                });
                // Create a new preference instance
                const preference = new mercadopago_1.Preference(mercadopago_2.default);
                // Create the preference
                const preferenceResult = yield preference.create({
                    body: {
                        items: validItems,
                        payment_methods: {
                            installments: 6,
                            excluded_payment_methods: [
                                {
                                    id: "visa",
                                },
                            ],
                        },
                        back_urls: {
                            success: "https://front-end-mercado-pago-integration.vercel.app/success",
                            pending: "https://front-end-mercado-pago-integration.vercel.app/test.com/pending",
                            failure: "https://front-end-mercado-pago-integration.vercel.app/failure",
                        },
                        // auto_return: "approved",
                        external_reference: `ORDER-${Date.now()}`,
                        notification_url: "https://checkout-pro-node-ts-integration.vercel.app/api/payment/webhook/mercadopago",
                    },
                    requestOptions: {
                        integratorId: "dev_24c65fb163bf11ea96500242ac130004",
                    },
                });
                // Return success response with the preference data
                res.status(201).json({
                    message: "Payment preference created successfully",
                    data: preferenceResult,
                });
            }
            catch (error) {
                console.error("Error creating payment preference:", error);
                const errorMessage = error instanceof Error ? error.message : "Unknown error";
                res.status(500).json({
                    message: "Failed to create payment preference",
                    error: errorMessage,
                });
            }
        });
    }
    webhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Handle the webhook notification from Mercado Pago
                console.log("Webhook received:", req.body);
                res.status(200).json({ message: "Webhook received successfully" });
            }
            catch (error) {
                console.error("Error creating payment preference:", error);
                const errorMessage = error instanceof Error ? error.message : "Unknown error";
                res.status(500).json({
                    message: "Failed to create payment preference",
                    error: errorMessage,
                });
            }
        });
    }
}
exports.PaymentController = PaymentController;
