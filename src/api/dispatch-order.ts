import { api } from "@/lib/axios";

export interface DispatchParams {
    orderId: string
}

export async function dispatchOrder({orderId}:DispatchParams) {
    await api.patch(`/orders/${orderId}/dispatch`)
}