import { Link } from "@tanstack/react-router"
import { User } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import logo from "@/assets/logo.svg"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
    const isMobile = useIsMobile()

    return (
        <div className="flex w-full items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center justify-center gap-2 size-8 rounded-md hover:bg-accent">
                    <img src={logo} alt="Logo" className="size-7" />
                </Link>
                <NavigationMenu viewport={isMobile}>
                    <NavigationMenuList className="flex-wrap">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/pruefungen">Prüfungen</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/benutzer">Benutzer</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <Link to="/profil" aria-label="Profil" className="flex items-center size-8">
                <User className="size-6" />
            </Link>
        </div>
    )
}
