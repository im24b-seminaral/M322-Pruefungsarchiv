import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import { NavigationMenuDemo } from '@/components/navigation'
import { Toaster } from 'sonner'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const location = useLocation()
    const isLoginPage = location.pathname === '/login'

    return (
        <>
            <Toaster />
            {!isLoginPage && (
                <div className="p-4">
                    <NavigationMenuDemo />
                </div>
            )}
            <div className={isLoginPage ? '' : 'container mx-w-7xl mx-auto'}>
                <Outlet />
            </div>
        </>
    )
}