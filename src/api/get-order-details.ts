import { api } from "@/lib/axios";

export interface GetOrderDetailsParams {
    orderId: string
}

interface GetOrderDetailsReponse {
    id: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    createdAt: string;
    totalInCents: number;
    customer: {
        name: string;
        email: string;
        phone: string | null;
    }
    orderItems: {
        id: string;
        priceInCents: number;
        quantity: number;
        product: {
            name: string;
        }
    }[]
}

export async function getOrderDetails({orderId}:GetOrderDetailsParams) {
    const response = await api.get<GetOrderDetailsReponse>(`/orders/${orderId}`)

    return response.data
}