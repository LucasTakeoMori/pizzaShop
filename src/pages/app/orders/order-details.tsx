import { getOrderDetails } from "@/api/get-order-details";
import { OrderStatus } from "@/components/order-status";
import { 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableFooter, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { OrderDetailsSkeleton } from "./order-details-skeleton";

export interface OrderDetailsProps {
    orderId: string
    open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps){
    const {data: order} = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderDetails({ orderId }),
        enabled: open,
    })

    if (!order) {
        return null
    }
    
    return (
        <>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-muted-foreground"> 
                        ID do pedido: <span className="font-medium text-foreground"> {orderId} </span>
                    </DialogTitle>

                    <DialogDescription> Detalhes do Pedido </DialogDescription>
                </DialogHeader>
                {order ? (
                    <div className="space-y-6">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">Status</TableCell>
                                    <TableCell className="flex justify-end">
                                        <OrderStatus status={order.status}/>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="text-muted-foreground">Cliente</TableCell>
                                    <TableCell className="flex justify-end">
                                            <span className="font-medium text-foreground">
                                                {order.customer.name}
                                            </span>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="text-muted-foreground">Telefone</TableCell>
                                    <TableCell className="flex justify-end">
                                            <span className="font-medium text-foreground">
                                                {order.customer.phone ?? 'Não informado'}
                                            </span>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="text-muted-foreground">E-mail</TableCell>
                                    <TableCell className="flex justify-end">
                                            <span className="font-medium ttext-foreground">
                                                {order.customer.email}
                                            </span>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="text-muted-foreground">Realizado há</TableCell>
                                    <TableCell className="flex justify-end">
                                            <span className="font-medium text-foreground">
                                            {formatDistanceToNow(order.createdAt, {
                                                locale: ptBR,
                                                addSuffix: true
                                            })}
                                            </span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead> Produto </TableHead>
                                    <TableHead className="text-rigt"> Qtd. </TableHead>
                                    <TableHead className="text-rigt"> Preço </TableHead>
                                    <TableHead className="text-rigt"> Subtotal </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {order.orderItems.map(item => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell> {item.product.name} </TableCell>
                                        <TableCell className="text-rigt"> {item.quantity} </TableCell>
                                        <TableCell className="text-rigt">
                                            {(item.priceInCents / 100).toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                        })} 
                                        </TableCell>
                                        <TableCell className="text-rigt"> 
                                            {(item.priceInCents * item.quantity / 100).toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })} 
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>

                            <TableFooter>
                                <TableCell colSpan={3}> Total do Pedido: </TableCell>
                                <TableCell className="text-right font-medium">
                                    {(order.totalInCents / 100).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })} 
                                </TableCell>
                            </TableFooter>
                        </Table>
                    </div>
                ): (
                    <OrderDetailsSkeleton />
                )}
            </DialogContent>
        </>
    )
}