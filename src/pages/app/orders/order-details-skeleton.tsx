import { Skeleton } from "@/components/ui/skeleton"
import { Table ,TableBody, TableRow, TableCell, TableHeader, TableHead, TableFooter } from "@/components/ui/table"
import { Key } from "react"

export function OrderDetailsSkeleton(){
    return (
        <div className="space-y-6">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="text-muted-foreground">
                            Status
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-20" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="text-muted-foreground">Cliente</TableCell>
                        <TableCell className="flex justify-end">
                            <Skeleton className="h-5 w-[164px]" />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-muted-foreground">
                            Telefone
                        </TableCell>
                        <TableCell className="flex justify-end">
                            <Skeleton className="h-5 w-[140px]" />
                        </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">E-mail</TableCell>
                            <TableCell className="flex justify-end">
                                <Skeleton className="h-5 w-[200px]" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Realizado há</TableCell>
                            <TableCell className="flex justify-end">
                                <Skeleton className="h-5 w-[148px]" />
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
                        {Array.from({ length: 2 }).map(_, index => {
                            return (
                                <TableRow key={index}>
                                    <TableCell> 
                                        <Skeleton className="h-5 w-[140px]"/>
                                    </TableCell>
                                    <TableCell className="text-rigt"> 
                                        <Skeleton className="h-5 w-3"/>
                                    </TableCell>
                                    <TableCell className="text-rigt">
                                        <Skeleton className="h-5 w-12"/>
                                    </TableCell>
                                    <TableCell className="text-rigt"> 
                                        <Skeleton className="h-5 w-12"/>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>

                    <TableFooter>
                        <TableCell colSpan={3}> Total do Pedido: </TableCell>
                        <TableCell className="text-right font-medium">
                            <Skeleton className="h-5 w-20"/>
                        </TableCell>
                    </TableFooter>
            </Table>
        </div>
    )
}