export type OrderStatus = 
    | "pending" 
    | "canceled" 
    | "processing" 
    | "delivering" 
    | "delivered"

interface OrderStatutsProps {
    status: OrderStatus
}

const orderStatsuMap: Record<OrderStatus, string> = {
    pending: 'Pendente',
    canceled: 'Cancelado',
    processing: 'Em preparo',
    delivering: 'Em entrega',
    delivered: 'Entregue'
}

export function OrderStatus({ status }: OrderStatutsProps) {
    return (
        <div className="flex items-center gap-2">
            {status === "pending" && (
                <span data-testid="badge" className="h-2 w-2 rounded-full bg-slate-400" />
            )}

            {status === "canceled" && (
                <span data-testid="badge" className="h-2 w-2 rounded-full bg-rose-500" />
            )}

            {status === "delivered" && (
                <span data-testid="badge" className="h-2 w-2 rounded-full bg-emerald-500" />
            )}
            
            {['processing', 'delivering'].includes(status) && (
                <span data-testid="badge" className="h-2 w-2 rounded-full bg-amber-500" />
            )}
            
                <span data-testid="badge" className="font-medium text-muted-foreground">
                {orderStatsuMap[status]}
            </span>
        </div>  
    )
}