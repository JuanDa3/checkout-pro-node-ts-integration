export interface PaymentRequest {
    transaction_amount: number;
    token: string;
    description: string;
    installments: number;
    payment_method_id: string;
    payer: {
        email: string;
    };
}

export interface ItemRequest {
    id: string;
    title: string;
    unit_price: number;
    description: string;
    category_id: string;
    picture_url: string;
    quantity: number;
    currency_id: string;
}

export interface PaymentResponse {
    id: string;
    status: string;
    status_detail: string;
    transaction_amount: number;
    payment_method_id: string;
    payer: {
        email: string;
    };
    date_approved: string;
    date_created: string;
}