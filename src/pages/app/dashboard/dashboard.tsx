import { Helmet } from "react-helmet-async"
import { MonthRevenueCard } from "./month-revenue-card"
import { DayOrdersAmountCard } from "./day-orders-amount.-card"
import { RevenueChart } from "./revenue-chart"
import { PopularProductChart } from "./popular-product-chart"
import { MonthCanceledOrdersAmounthCard } from "./month-canceled-orders-amount-card"
import { MonthOrdersAmountCard } from "./month-orders-amount-card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { OrderTableSkeleton } from "../orders/order-table-skeleton"
import { OrderTableRow } from "../orders/order-table-row"
import { z } from "zod";

export function Dashboard() {
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
        <>
            <Helmet title="Dashboard" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">
                    Dashboard
                </h1>

                <div className="grid grid-cols-4 gap-4">
                    <MonthRevenueCard />
                    <MonthOrdersAmountCard />
                    <DayOrdersAmountCard />
                    <MonthCanceledOrdersAmounthCard />
                </div>

                <div className="grid grid-cols-9 gap-4">
                    <RevenueChart />
                    <PopularProductChart />
                </div>

                <div className="w-full">
                    <div className="flex flex-col items-start gap-4">
                        <p className="text-2xl font-bold">Últimos pedidos</p>
                        <span className="text-sm text-muted-foreground">Visualize os últimos pedidos feitos no seu restaurante</span>
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
                                return <OrderTableRow key={order.orderId} order={order} />
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}