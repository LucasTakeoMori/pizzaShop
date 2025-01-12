import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderTableSkeleton } from "../orders/order-table-skeleton"
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";

import { z } from "zod";
import { LatestOrderTableRow } from "./latest-order-table-row";

export function LatestOrderDashboard() {
    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    const pageIndex = z.coerce.number()
        .transform(page => page - 1)
        .parse(searchParams.get('page') ?? '1')

    const { data: result, isLoading: isLoadingOrders } = useQuery({
        queryKey: ['orders', pageIndex, orderId, customerName, status],
        queryFn: () => getOrders({
            pageIndex,
            orderId,
            customerName,
            status: status === 'all' ? null : status
        }),
    })

    return (
        <div className="border rounded-sm p-4">
            <div className="flex flex-col items-start gap-1">
                <p className="text-1xl font-bold">Últimos pedidos</p>
                <span className="text-sm text-muted-foreground">Visualize os últimos 5 pedidos feitos no seu restaurante</span>
            </div>

            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[64px]"></TableHead>
                        <TableHead className="w-[180px]"> Identificador </TableHead>
                        <TableHead className="w-[180px]"> Realizado há </TableHead>
                        <TableHead className="w-[140px]"> Status </TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead className="w-[140px]">Total do Pedido </TableHead>
                        <TableHead className="w-[164px]"></TableHead>
                        <TableHead className="w-[132px]"></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoadingOrders && <OrderTableSkeleton length={5} />}

                    {result && result.orders.filter(order => order.status !== 'canceled').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5).map(order => {
                        return <LatestOrderTableRow key={order.orderId} order={order} />
                    })}
                </TableBody>
            </Table>
        </div>
    )
}