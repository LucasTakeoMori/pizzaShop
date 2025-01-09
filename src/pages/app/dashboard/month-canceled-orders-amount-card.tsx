import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSekeleton } from "./metric-card-skeleton";

export function MonthCanceledOrdersAmounthCard() {
    const { data: monthCanceledOrders} = useQuery({
        queryFn: getMonthCanceledOrdersAmount,
        queryKey: ['metrics', 'month-canceled-orders-amount']
    })


    return (
        <Card className="hover:opacity-90 transition-all duration-300 ease-in">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold ">
                    Pedidos Cancelados (mês)
                </CardTitle>

                <DollarSign className="h-4 w-4 text-muted-foreground "/>
            </CardHeader>
            <CardContent className="space-y-1">
            { monthCanceledOrders ? (
                    <>
                        <span className="text-2xl font-bold tracking-tight">
                            {monthCanceledOrders.amount.toLocaleString('pt-BR')}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            {monthCanceledOrders.diffFromLastMonth < 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-400">
                                        {monthCanceledOrders.diffFromLastMonth}%
                                    </span> em relação ao mês anterior
                                </>
                            ): (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400">
                                        +{monthCanceledOrders.diffFromLastMonth}%
                                    </span> em relação ao mês anterior
                                </>
                            )}
                        </p>
                    </>
                ): (
                    <MetricCardSekeleton />
                )}
            </CardContent>
        </Card>
    )
}