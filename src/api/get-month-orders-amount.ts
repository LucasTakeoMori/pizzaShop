import { api } from "@/lib/axios";

export interface GetMonthOrdersAmount {
    amount: number;
    diffFromLastMonth: number
}

export async function getMonthOrdersAmount() {
    const response = await api.get<GetMonthOrdersAmount>('./metrics/month-orders-amount');

    return response.data;
}