import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import logo from '@/assets/logo.svg'

export const Route = createFileRoute('/login')({
    component: Login,
})

function Login() {
    const navigate = useNavigate()
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <img src={logo} alt="Logo" className="size-6" />
                    Prüfungsarchiv
                </a>
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Willkommen zurück</CardTitle>
                            <CardDescription>
                                Einloggen mit Microsoft
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" className="w-full" onClick={() => navigate({ to: '/' })}>
                                        <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#F35325" d="M1 1h6.5v6.5H1V1z" /><path fill="#81BC06" d="M8.5 1H15v6.5H8.5V1z" /><path fill="#05A6F0" d="M1 8.5h6.5V15H1V8.5z" /><path fill="#FFBA08" d="M8.5 8.5H15V15H8.5V8.5z" /></svg>
                                        Einloggen
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                        Durch Klicken auf „Einloggen“ stimmen Sie unseren <a href="#">Nutzungsbedingungen</a>{" "}
                        und <a href="#">Datenschutzerklärung</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}

