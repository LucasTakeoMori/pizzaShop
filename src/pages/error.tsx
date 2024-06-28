import { Button } from "@/components/ui/button";
import { Link, useRouteError } from "react-router-dom";

export function Error() {
    const error = useRouteError() as Error

    return(
        <div className="flex h-screen flex-col items-center justify-center gap-5 mx-auto">
            <div className="">
                <h1 className="text-6xl font-bold pb-8">
                    Whoops, algo aconteceu...
                </h1>
                
                <p className="font-medium text-accent-foreground">
                    Aconteceu um erro na aplicação. Abaixo você encontra mais detalhes:
                </p>
                
                <pre>{error?.message || JSON.stringify(error)}</pre>
            </div>

            <Button asChild>
                <Link to="/" className="text-foreground antialiased tracking-tight"> 
                    Go Home 
                </Link>
            </Button>
        </div>
    )
}