# Checkout Pro Integration with Node.js SDK

This project demonstrates the integration with MercadoPago Checkout Pro using the official SDK for Node.js, implemented with TypeScript.

## Project Structure

```
checkout-pro-back/sdk-node/
├── .env                      # Environment variables configuration
├── src/
│   ├── config/
│   │   └── mercadopago.ts    # MercadoPago client configuration
│   ├── controllers/
│   │   └── payment.controller.ts # Payment preference creation logic
│   ├── routes/
│   │   └── payment.routes.ts  # API endpoints for payments
│   ├── types/
│   │   └── payment.types.ts   # TypeScript type definitions
│   ├── app.ts                # Express application setup
│   └── index.ts              # Application entry point
├── package.json              # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

### Description
This project is a backend implementation for integrating with MercadoPago Checkout Pro using the official Node.js SDK. Built with TypeScript, it provides a robust and type-safe way to create payment preferences and handle MercadoPago's payment flow.

### Features

- **Payment Preference Creation**: Create payment preferences with single or multiple items
- **Configurable Payment Options**: Customize installments, excluded payment methods, etc.
- **Environment Variable Configuration**: Securely store API credentials
- **Type Safety**: Leverages TypeScript for better code quality and developer experience

### API Endpoints

- **POST /api/payments**: Creates a new payment preference
  - Accepts both single item and multiple items formats
  - Returns the MercadoPago preference data including checkout URLs

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a ```.env``` file with your MercadoPago credentials:
```
MERCADOPAGO_ACCESS_TOKEN=your_access_token_here
MERCADO_PAGO_PUBLIC_KEY=your_public_key_here
MERCADO_PAGO_ENVIRONMENT=test
MERCADO_PAGO_INTEGRATOR_ID=your_integrator_id_here
PORT=3000
```

4. Start the development server:
```
npm run dev
```

### Usage
To create a payment preference, send a POST request to the ```/api/payments endpoint``` with the following body:
```json
{
  "items": [
    {
      "id": "1",
      "title": "Product Name",
      "unit_price": 100,
      "description": "Product description",
      "category_id": "category",
      "picture_url": "https://example.com/image.jpg",
      "quantity": 1
    }
  ]
}
```
The response will include the MercadoPago preference data with the necessary URLs to redirect users to the payment page.
### Technologies

- Node.js
- Express
-TypeScript
-MercadoPago SDK

### License
MIT