import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { UserCard } from '@/components/UserCard'
import { Input } from '@/components/ui/input'
import { AnimatePresence, motion } from 'framer-motion'

export const Route = createFileRoute('/benutzer')({
    component: Benutzer,
})

type User = {
    name: string
    handle: string
    downloads: number
    likes: number
    followers: number
    models: number
    description: string
    verified?: boolean
    accentColor?: string
}

// Beispiel-Daten für Benutzer (basierend auf den Prüfungen)
const alleBenutzer: User[] = [
    {
        name: 'Max Mustermann',
        handle: '@maxmustermann',
        downloads: 234,
        likes: 156,
        followers: 89,
        models: 12,
        description: 'Mathematik-Enthusiast mit Fokus auf Grundlagen und Algebra',
        verified: true,
        accentColor: '#3b82f6',
    },
    {
        name: 'Anna Schmidt',
        handle: '@annaschmidt',
        downloads: 412,
        likes: 289,
        followers: 145,
        models: 23,
        description: 'Deutsch-Lehrerin spezialisiert auf Grammatik und Rechtschreibung',
        verified: true,
        accentColor: '#ec4899',
    },
    {
        name: 'Tom Müller',
        handle: '@tommuller',
        downloads: 128,
        likes: 87,
        followers: 56,
        models: 8,
        description: 'Englisch-Tutor mit Schwerpunkt auf Vokabular und Grundlagen',
        accentColor: '#10b981',
    },
    {
        name: 'Lisa Weber',
        handle: '@lisaweber',
        downloads: 298,
        likes: 203,
        followers: 112,
        models: 15,
        description: 'Physik-Expertin für Mechanik und technische Anwendungen',
        verified: false,
        accentColor: '#f59e0b',
    },
    {
        name: 'Peter Meier',
        handle: '@petermeier',
        downloads: 356,
        likes: 267,
        followers: 134,
        models: 19,
        description: 'Mathematik-Dozent mit Expertise in Algebra und Gleichungen',
        verified: true,
        accentColor: '#8b5cf6',
    },
    {
        name: 'Maria Koch',
        handle: '@mariakoch',
        downloads: 189,
        likes: 142,
        followers: 78,
        models: 11,
        description: 'Deutsch-Spezialistin für Rechtschreibung und Sprachkompetenz',
        verified: false,
        accentColor: '#ef4444',
    },
]

function Benutzer() {
    const [searchQuery, setSearchQuery] = React.useState('')

    // Filtere Benutzer basierend auf Suchanfrage
    const gefilterteBenutzer = React.useMemo(() => {
        if (!searchQuery.trim()) {
            return alleBenutzer
        }
        const query = searchQuery.toLowerCase()
        return alleBenutzer.filter(
            (benutzer) =>
                benutzer.name.toLowerCase().includes(query) ||
                benutzer.handle.toLowerCase().includes(query) ||
                benutzer.description.toLowerCase().includes(query)
        )
    }, [searchQuery])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-foreground">Benutzer</h1>

            {/* Suchfunktion */}
            <div className="mb-8">
                <div className="relative w-[300px]">
                    <Input
                        type="text"
                        placeholder="Benutzer suchen..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Benutzer-Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gefilterteBenutzer.length === 0 ? (
                    <motion.div
                        className="col-span-full text-center py-12 text-muted-foreground"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                    >
                        Keine Benutzer gefunden, die Ihrer Suche entsprechen.
                    </motion.div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {gefilterteBenutzer.map((benutzer) => (
                            <motion.div
                                key={benutzer.handle}
                                className="relative min-w-56 rounded-xl h-fit"
                                layout
                                initial={{ opacity: 0, y: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.6 }}
                                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
                            >
                                <UserCard
                                    name={benutzer.name}
                                    handle={benutzer.handle}
                                    downloads={benutzer.downloads}
                                    likes={benutzer.likes}
                                    followers={benutzer.followers}
                                    models={benutzer.models}
                                    description={benutzer.description}
                                    verified={benutzer.verified}
                                    accentColor={benutzer.accentColor}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    )
}

