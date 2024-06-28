import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { registerRestaurant } from '@/api/register-restaurant'

const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    email: z.string().email(),
    phone: z.string()
})

type SignupForm = z.infer<typeof signUpForm>

export function SignUp(){
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {isSubmitting} } = useForm<SignupForm>()

    const { mutateAsync: registerRestaurantFn } = useMutation({
        mutationFn: registerRestaurant
    })

    async function handleSignin(data: SignupForm){
        	try{
                await registerRestaurantFn({
                    restaurantName: data.restaurantName,
                    managerName: data.managerName,
                    email: data.email,
                    phone: data.phone
                })

                toast.success('Restaurante cadastrado com sucesso!', {
                    action: {
                      label: 'Login',
                      onClick: () => navigate(`/sign-in?email=${data.email}`),
                    },
                })
            }catch{
                toast.error('Erro ao cadastrar Restaurante')
            }
    }

    return (<>
        <Helmet title='Cadastro'/>
        <div className='p-8'>
            <Button variant={"ghost"} asChild className='absolute right-4 top-8'>
                    <Link to='/sign-in'>
                        Fazer Login
                    </Link>
            </Button>
            <div className='w-[350px] flex flex-col justify-center gap-6'>
                <div className='flex flex-col gap-2 text-center'>
                    <h1 className='text-2xl font-semibold tracking-tight'>
                        Criar Conta
                    </h1>

                    <p className=' text-sm text-muted-foreground'>
                        Seja um Parceiro e comece suas vendas
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleSignin)} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='restaurantName'> Nome do Restaurante </Label>
                        <Input id='restaurantName' type='text' {...register('restaurantName')}/>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='managerName'> Nome do Usuário </Label>
                        <Input id='managerName' type='text' {...register('managerName')}/>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='phone'> Telefone </Label>
                        <Input id='phone' type='tel' {...register('phone')}/>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='email'> Seu E-mail </Label>
                        <Input id='email' type='email' {...register('email')}/>
                    </div>

                    <Button disabled = {isSubmitting} className = "w-full"type='submit'>
                        Finalizar cadastro
                    </Button>

                    <p className='px-6 text-left text-sm leading-relaxed text-muted-foreground'>
                        Ao continuar, você concorda com nossos <a href='' className='hover:text-foreground underline underline-offset-4'>Termos de Serviço</a> e 
                        <a href='' className='hover:text-foreground underline underline-offset-4'> Política de Privacidade</a>
                    </p>
                </form>
            </div>
        </div>
    </>)
}