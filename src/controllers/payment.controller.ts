import { Request, Response } from "express";
import { Preference } from "mercadopago";
import mercadoPagoClient from "../config/mercadopago";
import { Item } from "mercadopago/dist/clients/order/commonTypes";
import { ItemRequest } from "../types/payment.types";

export class PaymentController {
  async createPreference(req: Request, res: Response) {
    try {
      let items = [];

      if (req.body.items && Array.isArray(req.body.items)) {
        // Case: Request contains an items array
        items = req.body.items;
      } else if (req.body.id && req.body.title && req.body.unit_price) {
        // Case: Request contains a single item directly
        items = [req.body];
      } else {
        return res.status(400).json({
          message:
            "Invalid request: items must be provided as an array or a single item object",
        });
      }

      // Ensure all items have the required properties
      const validItems = items.map((item: ItemRequest) => ({
        id: item.id?.toString() || "",
        title: item.title || "",
        description: item.description || "",
        picture_url: item.picture_url || "",
        category_id: item.category_id || "",
        quantity: item.quantity || 1,
        currency_id: item.currency_id || "USD",
        unit_price: Number(item.unit_price) || 0,
      }));

      // Create a new preference instance
      const preference = new Preference(mercadoPagoClient);

      // Create the preference
      const preferenceResult = await preference.create({
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
            success: "https://test.com/success",
            pending: "https://test.com/pending",
            failure: "https://test.com/failure",
          },
          // auto_return: "approved",
          external_reference: `ORDER-${Date.now()}`,
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
    } catch (error) {
      console.error("Error creating payment preference:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({
        message: "Failed to create payment preference",
        error: errorMessage,
      });
    }
  }
}
