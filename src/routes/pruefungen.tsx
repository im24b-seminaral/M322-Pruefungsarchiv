import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/pruefungen')({
    component: PruefungenLayout,
})

function PruefungenLayout() {
    return <Outlet />
}

