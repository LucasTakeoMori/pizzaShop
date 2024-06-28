import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GetProfileManager, getManagedRestaurant } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";


const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog(){
    const queryClient = useQueryClient()

    const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: 1000,
    })

    function updateManagedRestaurantCache({name, description}: StoreProfileSchema){
        const cached = queryClient.getQueryData<GetProfileManager>(['managed-restaurant'])

        /* Atualizando a informação via HTTP state em tempo real */
        if(cached) {
            queryClient.setQueryData<GetProfileManager>(['managed-restaurant'], {
                ...cached,
                name,
                description
            })
        }

        return { cached }
    }

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onMutate({name, description}) {
            const { cached } =  updateManagedRestaurantCache({name, description})

            return { previousProfile: cached }
        },
        
        onError(_, __, context) {
            if(context?.previousProfile) {
                updateManagedRestaurantCache(context.previousProfile)
            }
        },
    })

    const {
        register,
        handleSubmit,
        formState: {isSubmitting}
    } = useForm<StoreProfileSchema>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name ?? '', 
            description: managedRestaurant?.description ?? '',
        }
    })
    
    async function handleUpdateProfile(data: StoreProfileSchema){
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description,
            })

            toast.success('Perfil atualizado com sucesso!')
        } catch (error) {

            toast.error(`Erro ao tentar atualizar o perfil: ${error}`)
        }
        
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil Da Loja</DialogTitle>

                <DialogDescription>
                    Atualizar informações do estabelecimento
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="space-y-4 gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">
                            Nome
                        </Label>
                        <Input className="col-span-3" id="name" {...register('name')}/>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="description">
                            Descrição
                        </Label>
                        <Textarea className="col-span-3" id="description" {...register('description')}/>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost"> Cancelar </Button>
                    </DialogClose>
                    <Button type="submit" variant="success" disabled={isSubmitting} > Salvar </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}