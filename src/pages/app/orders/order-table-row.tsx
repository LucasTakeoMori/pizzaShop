import { Clock, Search, X, MoveRight } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { approveOrder } from "@/api/approve-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";

export interface OrderTableRowProps {
    order: {
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
    }
}

export function OrderTableRow({ order }: OrderTableRowProps){
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const queryClient = useQueryClient()


    function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
        const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
            queryKey: ['orders'],
        })

        ordersListCache.forEach(([cacheKey, cacheData]) => {
            if (!cacheData) {
                return
            }

            queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
                ...cacheData,
                orders: cacheData.orders.map(order => {
                    if(order.orderId === orderId) {
                        return { ...order, status }
                    }

                    return order
                })
            })
        })
    }

    const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
        mutationFn: cancelOrder,
        async onSuccess(_, {orderId}) {
            updateOrderStatusOnCache(orderId, 'canceled')
        },
    })

    const { mutateAsync: approveOrderFn, isPending: isAprroveingOrder } = useMutation({
        mutationFn: approveOrder,
        async onSuccess(_, {orderId}) {
            updateOrderStatusOnCache(orderId, 'processing')
        },
    })

    const { mutateAsync: dispatchlOrderFn, isPending: isDispatchingOrder } = useMutation({
        mutationFn: dispatchOrder,
        async onSuccess(_, {orderId}) {
            updateOrderStatusOnCache(orderId, 'delivering')
        },
    })

    const { mutateAsync: deliveringOrderFn, isPending: isDeliveringOrder } = useMutation({
        mutationFn: deliverOrder,
        async onSuccess(_, {orderId}) {
            updateOrderStatusOnCache(orderId, 'delivered')
        },
    })

    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant={'outline'} size={'xs'}>
                            <Search className="h-3 w-3"/>
                            <span className="sr-only">Detalhes do Pedido</span>
                        </Button>
                    </DialogTrigger>

                        <OrderDetails orderId={order.orderId} open={isDetailsOpen}/>
                </Dialog>
            </TableCell>

            <TableCell className="font-mono text-xs font-medium">
                {order.orderId}
            </TableCell>

            <TableCell className="text-muted-foreground"> 
                <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3"/>
                    <span className="font-medium">
                        {formatDistanceToNow(order.createdAt, {
                            locale: ptBR,
                            addSuffix: true
                        })}
                    </span>
                </div>
            </TableCell>

            <TableCell>
                <OrderStatus status={order.status}/>
            </TableCell>

            <TableCell className="font-medium">
                {order.customerName}
            </TableCell>

            <TableCell className="font-medium">
                {(order.total / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })}
            </TableCell>
            
            <TableCell>
                {order.status === 'pending' && (
                    <Button 
                        variant={'outline'}
                        disabled={isAprroveingOrder}
                        onClick={() => approveOrderFn({ orderId: order.orderId })}
                        size={'xs'} 
                        className="flex items-center gap-1"
                        >
                            Aprovar

                    </Button>
                )}

                {order.status === 'processing' && (
                    <Button 
                        variant={'outline'}
                        disabled={isDispatchingOrder}
                        onClick={() => dispatchlOrderFn({ orderId: order.orderId })}
                        size={'xs'} 
                        className="flex items-center gap-1"
                        >
                            Em Entrega

                    </Button>
                )}

                {order.status === 'delivering' && (
                    <Button 
                        variant={'outline'}
                        disabled={isDeliveringOrder}
                        onClick={() => deliveringOrderFn({ orderId: order.orderId })}
                        size={'xs'}
                        className="flex items-center gap-1"
                        >
                            Entregue
                    </Button>
                )}
                
            </TableCell>

            <TableCell>
                <Button 
                    disabled={
                        !['pending', 'processing'].includes(order.status) ||
                        isCancelingOrder
                    } 
                    onClick={() => cancelOrderFn({ orderId: order.orderId })}
                    variant={'ghost'} 
                    size={'xs'} 
                    className="flex gap-2 hover:text-rose-500 dark:hover:text-rose-600"
                >
                    <X className="h-3 w-3"/>
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}