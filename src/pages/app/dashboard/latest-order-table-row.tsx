import { Clock, Search, X } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { OrderStatus } from "@/components/order-status";
import {  useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { OrderDetails } from "../orders/order-details";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from 'date-fns/locale'

export interface LatestOrderTableRowProps {
    order: {
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
    }
}

export function LatestOrderTableRow({ order }: LatestOrderTableRowProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant={'outline'} size={'xs'}>
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do Pedido</span>
                        </Button>
                    </DialogTrigger>

                    <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
                </Dialog>
            </TableCell>

            <TableCell className="font-mono text-xs font-medium">
                {order.orderId}
            </TableCell>

            <TableCell className="text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span className="font-medium">
                        {formatDistanceToNow(order.createdAt, {
                            locale: ptBR,
                            addSuffix: true
                        })}
                    </span>
                </div>
            </TableCell>

            <TableCell>
                <OrderStatus status={order.status} />
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
        </TableRow>
    )
}