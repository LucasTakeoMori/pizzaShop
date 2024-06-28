import { Building, ChevronDown, LogOut, Replace } from "lucide-react";
import { Button } from "./ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuTrigger, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator 
} from "./ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { StoreProfileDialog } from "./store-profile-dialog";
import { signOut } from "@/api/sign-out";
import { useNavigate } from "react-router-dom";

export function AccountMenu() {
    const navigate = useNavigate()

    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity,
    })

    const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity,
    })

    const { mutateAsync: signOutFn, isPending: isSigningOut} = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            navigate('/sign-in')
        }
    })

    return (
        <>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button 
                            variant={'outline'} 
                            className="flex items-center gap-2 select-none"
                        >
                            {
                                isLoadingManagedRestaurant ? (
                                    <Skeleton className="h-4 w-40"/>
                                ) : managedRestaurant?.name
                            }

                            <ChevronDown className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="flex flex-col">
                            {isLoadingProfile ? (
                                <div className="space-y-1.5">
                                    <Skeleton className="h-4 w-32"/>
                                    <Skeleton className="h-3 w-24"/>
                                </div>
                            ) : (
                                <>
                                    <span>{profile?.name}</span>
                                    <span className="text-sm font-normal text-muted-foreground">
                                        {profile?.email}
                                    </span>
                                </>
                            )}
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />
                        <DialogTrigger asChild>
                            <DropdownMenuItem>
                                <Building className="h-4 w-4 mr-2"/>
                                <span>Perfil da loja</span>
                            </DropdownMenuItem>
                        </DialogTrigger>

                        <DropdownMenuItem className="text-rose-500 dark:text-rose-400" asChild disabled={isSigningOut}>
                            <button className="w-full" onClick={() => signOutFn()}>
                                <LogOut className="h-4 w-4 mr-2"/>
                                <span>Sair</span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <StoreProfileDialog />
            </Dialog>
        </>
    )
}