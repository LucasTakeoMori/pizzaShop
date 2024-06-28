import { api } from "@/lib/axios";

export interface GetMonthCanceledOrdersAmount {
    amount: number;
    diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmount() {
    const response = await api.get<GetMonthCanceledOrdersAmount>('./metrics/month-canceled-orders-amount');

    return response.data;
}