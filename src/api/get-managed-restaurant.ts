import { api } from "@/lib/axios";

export interface GetProfileManager {
    id: string;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    description: string | null;
    managerId: string | null;
}

export async function getManagedRestaurant() {
    const response = await api.get<GetProfileManager>(
        '/managed-restaurant',
    )

    return response.data
}