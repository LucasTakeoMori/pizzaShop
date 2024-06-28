import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function NotFound() {
    return(
        <div className="flex h-screen flex-col items-center justify-center gap-5 mx-auto">
            <div className="">
                <h1 className="text-6xl font-bold pb-8">
                    Página não encontrada - 404
                </h1>
                
                <p className="font-medium text-muted-foreground">
                    Parece que você tentou acessar uma página que não existe em
                    nossa base de dados
                </p>
            </div>

            <Button asChild>
                <Link to="/" className="text-foreground antialiased tracking-tight"> 
                    Go Home 
                </Link>
            </Button>
        </div>
    )
}