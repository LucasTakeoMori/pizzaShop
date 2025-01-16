import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const orderFilterSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional()
})

type OrderFilterSchema = z.infer<typeof orderFilterSchema>

export function OrderTableFilter(){
    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')


    const {register, handleSubmit, control, reset} = useForm<OrderFilterSchema>({
        resolver: zodResolver(orderFilterSchema),
        defaultValues: {
            orderId: orderId ?? '',
            customerName: customerName ?? '',
            status: status ?? 'all',
        }
    })

    function handleFilter({orderId, customerName, status}: OrderFilterSchema) {
        setSearchParams(state => {
            if (orderId) {
                state.set('orderId', orderId)
            } else {
                state.delete('orderId' )
            }

            if (customerName) {
                state.set('customerName', customerName)
            } else {
                state.delete('customerName')
            }

            if (status) {
                state.set('status', status)
            } else {
                state.delete('status' )
            }

            state.set('page', '1')

            return state
        })
    }

    function handleClearFilters(){
        setSearchParams(state => {
            state.delete('orderId')
            state.delete('customerName')
            state.delete('status')
            state.set('page', '1')
            
            return state
        })

        reset({
            orderId: '',
            customerName: '',
            status: 'all',
        })
    }

    return (
        <>
            <form className="flex items-center gap-2" onSubmit={handleSubmit(handleFilter)}>
                <span className="text-sm font-semibold">Filtros</span>
                <Input placeholder="ID do pedido" className="h-8 w-auto" {...register('orderId')}/>    
                <Input placeholder="Nome do cliente" className="h-8 w-[320px]" {...register('customerName')}/>

                <Controller name="status" control={control} render={({ field:{ name, onChange, value, disabled}}) => {
                    return (
                        <Select  defaultValue={"all"} name={name} value={value} onValueChange={onChange} disabled={disabled} >
                            <SelectTrigger className="h-8 w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="canceled ">Cancelado</SelectItem>
                                <SelectItem value="processing">Em preparo</SelectItem>
                                <SelectItem value="delivering">Em Entrega</SelectItem>
                                <SelectItem value="delivered">Entregue</SelectItem>
                            </SelectContent>
                        </Select>
                    )
                }} />


                <Button variant={"secondary"} type="submit" size={"xs"} className="flex gap-2"> 
                    <Search className="h-3 w-3"/>
                    Filtrar 
                </Button>

                <Button 
                    onClick={handleClearFilters} 
                    variant={"secondary"} 
                    type="button" 
                    size={"xs"} 
                    className="flex gap-2 hover:text-rose-600"
                > 

                    <X className="h-3 w-3"/>
                    Remover Filtros
                </Button>
            </form>
        </>
    )
}