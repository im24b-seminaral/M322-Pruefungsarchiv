import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs')({
    component: Docs,
})

function Docs() {
    return <div>Docs</div>
}


