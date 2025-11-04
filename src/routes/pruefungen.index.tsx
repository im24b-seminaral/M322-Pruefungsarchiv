import { createFileRoute, Link } from '@tanstack/react-router'
import * as React from 'react'
import { Check, PlusCircle, Star, User } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

export const Route = createFileRoute('/pruefungen/')({
    component: Pruefungen,
})

// Typ für Prüfungen
type Pruefung = {
    id: number
    titel: string
    rating: number
    benutzer: string
    bild: string
    fach: string
    thema: string
    tag: string
    lehrperson: string
    loesungVorhanden: boolean
}

// Beispiel-Daten für Prüfungen
const allePruefungen: Pruefung[] = [
    {
        id: 1,
        titel: 'Mathematik Grundlagen',
        rating: 4,
        benutzer: 'Max Mustermann',
        bild: 'https://placehold.co/210x297',
        fach: 'Mathematik',
        thema: 'Grundlagen',
        tag: 'Klausur',
        lehrperson: 'Herr Schmidt',
        loesungVorhanden: true,
    },
    {
        id: 2,
        titel: 'Deutsche Grammatik',
        rating: 5,
        benutzer: 'Anna Schmidt',
        bild: 'https://placehold.co/210x297',
        fach: 'Deutsch',
        thema: 'Grammatik',
        tag: 'Test',
        lehrperson: 'Frau Müller',
        loesungVorhanden: true,
    },
    {
        id: 3,
        titel: 'Englisch Vokabular',
        rating: 3,
        benutzer: 'Tom Müller',
        bild: 'https://placehold.co/210x297',
        fach: 'Englisch',
        thema: 'Grundlagen',
        tag: 'Übung',
        lehrperson: 'Herr Weber',
        loesungVorhanden: false,
    },
    {
        id: 4,
        titel: 'Physik Mechanik',
        rating: 4,
        benutzer: 'Lisa Weber',
        bild: 'https://placehold.co/210x297',
        fach: 'Physik',
        thema: 'Grundlagen',
        tag: 'Klausur',
        lehrperson: 'Frau Becker',
        loesungVorhanden: true,
    },
    {
        id: 5,
        titel: 'Algebra Gleichungen',
        rating: 5,
        benutzer: 'Peter Meier',
        bild: 'https://placehold.co/210x297',
        fach: 'Mathematik',
        thema: 'Algebra',
        tag: 'Test',
        lehrperson: 'Herr Schmidt',
        loesungVorhanden: false,
    },
    {
        id: 6,
        titel: 'Rechtschreibung',
        rating: 4,
        benutzer: 'Maria Koch',
        bild: 'https://placehold.co/210x297',
        fach: 'Deutsch',
        thema: 'Rechtschreibung',
        tag: 'Hausaufgabe',
        lehrperson: 'Frau Müller',
        loesungVorhanden: true,
    },
]

function Pruefungen() {
    const [fach, setFach] = React.useState<Set<string>>(new Set())
    const [thema, setThema] = React.useState<Set<string>>(new Set())
    const [tag, setTag] = React.useState<Set<string>>(new Set())
    const [bewertung, setBewertung] = React.useState<Set<string>>(new Set())
    const [lehrperson, setLehrperson] = React.useState<Set<string>>(new Set())
    const [loesungVorhanden, setLoesungVorhanden] = React.useState<boolean>(false)

    // Eindeutige Werte aus den Prüfungsdaten für die Filter generieren
    const faecher = React.useMemo(() => {
        const unique = Array.from(new Set(allePruefungen.map(p => p.fach)))
        return unique
    }, [])

    const themen = React.useMemo(() => {
        const unique = Array.from(new Set(allePruefungen.map(p => p.thema)))
        return unique
    }, [])

    const tags = React.useMemo(() => {
        const unique = Array.from(new Set(allePruefungen.map(p => p.tag)))
        return unique
    }, [])

    const bewertungen = ['1 Stern', '2 Sterne', '3 Sterne', '4 Sterne', '5 Sterne']

    const lehrpersonen = React.useMemo(() => {
        const unique = Array.from(new Set(allePruefungen.map(p => p.lehrperson)))
        return unique
    }, [])

    // Filterfunktion
    const gefiltertePruefungen = React.useMemo(() => {
        return allePruefungen.filter((pruefung) => {
            // Fach Filter
            if (fach.size > 0) {
                const faecherFiltered = Array.from(fach).filter(f => f !== 'Alle')
                if (faecherFiltered.length > 0 && !faecherFiltered.includes(pruefung.fach)) {
                    return false
                }
            }

            // Thema Filter
            if (thema.size > 0) {
                const themenFiltered = Array.from(thema).filter(t => t !== 'Alle')
                if (themenFiltered.length > 0 && !themenFiltered.includes(pruefung.thema)) {
                    return false
                }
            }

            // Tag Filter
            if (tag.size > 0) {
                const tagsFiltered = Array.from(tag).filter(t => t !== 'Alle')
                if (tagsFiltered.length > 0 && !tagsFiltered.includes(pruefung.tag)) {
                    return false
                }
            }

            // Bewertung Filter
            if (bewertung.size > 0) {
                const bewertungenFiltered = Array.from(bewertung).filter(b => b !== 'Alle')
                if (bewertungenFiltered.length > 0) {
                    const ratingMatch = bewertungenFiltered.some(b => {
                        const bewertungNum = parseInt(b.charAt(0))
                        return pruefung.rating === bewertungNum
                    })
                    if (!ratingMatch) {
                        return false
                    }
                }
            }

            // Lehrperson Filter
            if (lehrperson.size > 0) {
                const lehrpersonenFiltered = Array.from(lehrperson).filter(l => l !== 'Alle')
                if (lehrpersonenFiltered.length > 0 && !lehrpersonenFiltered.includes(pruefung.lehrperson)) {
                    return false
                }
            }

            // Lösung vorhanden Filter
            if (loesungVorhanden && !pruefung.loesungVorhanden) {
                return false
            }

            return true
        })
    }, [fach, thema, tag, bewertung, lehrperson, loesungVorhanden])

    const FilterSelect = ({ title, selectedValues, onSelectedValuesChange, options }: { title: string; selectedValues: Set<string>; onSelectedValuesChange: (values: Set<string>) => void; options: string[] }) => {
        const [open, setOpen] = React.useState(false)

        // Konvertiere string[] zu {value, label} Objekte
        const optionObjects = React.useMemo(() =>
            options.map(opt => ({ value: opt, label: opt }))
            , [options])

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 border-dashed">
                        <PlusCircle className="size-4" />
                        {title}
                        {selectedValues.size > 0 && (
                            <>
                                <Separator orientation="vertical" className="mx-2 h-4" />
                                <Badge
                                    variant="secondary"
                                    className="rounded-sm px-1 font-normal lg:hidden"
                                >
                                    {selectedValues.size}
                                </Badge>
                                <div className="hidden gap-1 lg:flex">
                                    {selectedValues.size > 2 ? (
                                        <Badge
                                            variant="secondary"
                                            className="rounded-sm px-1 font-normal"
                                        >
                                            {selectedValues.size} selected
                                        </Badge>
                                    ) : (
                                        optionObjects
                                            .filter((option) => selectedValues.has(option.value))
                                            .map((option) => (
                                                <Badge
                                                    variant="secondary"
                                                    key={option.value}
                                                    className="rounded-sm px-1 font-normal"
                                                >
                                                    {option.label}
                                                </Badge>
                                            ))
                                    )}
                                </div>
                            </>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                        <CommandInput placeholder={title} />
                        <CommandList>
                            <CommandEmpty>Keine Ergebnisse.</CommandEmpty>
                            <CommandGroup>
                                {optionObjects.map((option) => {
                                    const isSelected = selectedValues.has(option.value)
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            onSelect={() => {
                                                const newValues = new Set(selectedValues)
                                                if (isSelected) {
                                                    newValues.delete(option.value)
                                                } else {
                                                    newValues.add(option.value)
                                                }
                                                onSelectedValuesChange(newValues)
                                            }}
                                        >
                                            <div
                                                className={cn(
                                                    "flex size-4 items-center justify-center rounded-[4px] border",
                                                    isSelected
                                                        ? "bg-primary border-primary text-primary-foreground"
                                                        : "border-input [&_svg]:invisible"
                                                )}
                                            >
                                                <Check className="text-primary-foreground size-3.5" />
                                            </div>
                                            <span>{option.label}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                            {selectedValues.size > 0 && (
                                <>
                                    <CommandSeparator />
                                    <CommandGroup>
                                        <CommandItem
                                            onSelect={() => onSelectedValuesChange(new Set())}
                                            className="justify-center text-center"
                                        >
                                            Filter zurücksetzen
                                        </CommandItem>
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Prüfungen</h1>

            {/* Filter-Reihe */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
                <FilterSelect title="Fach" selectedValues={fach} onSelectedValuesChange={setFach} options={faecher} />
                <FilterSelect title="Thema" selectedValues={thema} onSelectedValuesChange={setThema} options={themen} />
                <FilterSelect title="Tag" selectedValues={tag} onSelectedValuesChange={setTag} options={tags} />
                <FilterSelect title="Bewertung" selectedValues={bewertung} onSelectedValuesChange={setBewertung} options={bewertungen} />
                <FilterSelect title="Lehrperson" selectedValues={lehrperson} onSelectedValuesChange={setLehrperson} options={lehrpersonen} />

                {/* Lösung vorhanden Filter */}
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="loesung"
                        checked={loesungVorhanden}
                        onCheckedChange={(checked) => setLoesungVorhanden(checked === true)}
                    />
                    <label
                        htmlFor="loesung"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                        Lösung vorhanden
                    </label>
                </div>
            </div>

            {/* Prüfungs-Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {gefiltertePruefungen.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        Keine Prüfungen gefunden, die den Filterkriterien entsprechen.
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {gefiltertePruefungen.map((pruefung) => (
                            <motion.div
                                key={pruefung.id}
                                className="relative min-w-56 rounded-xl pt-0 shadow-lg h-fit"
                                layout
                                initial={{ opacity: 0, y: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.6 }}
                                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
                            >
                                <div className="flex items-center justify-center overflow-hidden rounded-t-xl">
                                    <AspectRatio ratio={210 / 250}>
                                        <motion.img
                                            src={pruefung.bild}
                                            alt={pruefung.titel}
                                            className="w-full rounded-t-xl z-0 h-full object-cover"
                                            whileHover={{ scale: 1.03 }}
                                            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                                        />
                                    </AspectRatio>
                                </div>
                                <Card className="border-none -mt-2.5 relative z-10 rounded-xl">
                                    <CardHeader>
                                        <Link to="/pruefungen/$id" className='hover:underline' params={{ id: pruefung.id.toString() }}>
                                            <CardTitle className="hover:text-primary cursor-pointer transition-colors">
                                                {pruefung.titel}
                                            </CardTitle>
                                        </Link>
                                    </CardHeader>
                                    <CardContent>
                                        {/* Rating mit 5 Sternen */}
                                        <div className="flex items-center gap-1 mb-4">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-5 w-5 ${star <= pruefung.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'fill-gray-200 text-gray-200'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{pruefung.benutzer}</span>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    )
}


