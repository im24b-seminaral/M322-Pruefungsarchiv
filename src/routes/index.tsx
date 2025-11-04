import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    const navigate = useNavigate()
    navigate({ to: '/pruefungen' })
    return null
}