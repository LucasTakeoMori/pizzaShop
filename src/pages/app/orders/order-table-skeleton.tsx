import { TableCell, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export function OrderTableSkeleton() {
    return Array.from({length: 10}).map((_, index) => {
        return (
            <TableRow key={index}>
                <TableCell>
                    <Button disabled variant="outline" size={'xs'}>
                        <Search className="h-3 w-3"/>
                        <span className="sr-only">Detalhes do Pedido</span>
                    </Button>
                </TableCell>

                <TableCell>
                    <Skeleton className="h-4 w-[172px]"/>
                </TableCell>

            <TableCell> 
                <Skeleton className="h-4 w-[148px]"/>
            </TableCell>

            <TableCell>
                <Skeleton className="h-4 w-[110px]"/>
            </TableCell>

            <TableCell>
                <Skeleton className="h-4 w-[148px]"/>
            </TableCell>

            <TableCell>
                <Skeleton className="h-4 w-[64x]"/>
            </TableCell>
                
            <TableCell>
                <Skeleton className="h-4 w-[92x]"/>
            </TableCell>

            <TableCell>
                <Skeleton className="h-4 w-[92x]"/>
            </TableCell>
            </TableRow>
        )
    })
}