import { createFileRoute, useNavigate } from '@tanstack/react-router'
import * as React from 'react'
import { Star, CheckCircle2, XCircle, Download, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { toast } from 'sonner'

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

export const Route = createFileRoute('/pruefungen/$id')({
  component: PruefungDetail,
})

function PruefungDetail() {
  const navigate = useNavigate()
  const { id } = Route.useParams()
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [downloaded, setDownloaded] = React.useState(false)

  // Prüfung basierend auf ID finden
  const pruefung = allePruefungen.find((p) => p.id === parseInt(id))

  if (!pruefung) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Prüfung nicht gefunden</h1>
        <p className="text-muted-foreground">
          Die Prüfung mit der ID {id} existiert nicht.
        </p>
      </div>
    )
  }

  // Für die Galerie verwenden wir das gleiche Bild mehrfach (oder könnten mehrere Varianten erstellen)
  const images = ["https://placehold.co/210x297/orange/white", "https://placehold.co/210x297/blue/white", "https://placehold.co/210x297/green/white", "https://placehold.co/210x297/red/white"]

  // Beispiel-Datum für Upload (in einer echten App würde das aus den Daten kommen)
  const uploadDate = '15. März 2024'

  // Beispiel-Bewertungsanzahl
  const totalReviews = 127

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <Button variant="outline" onClick={() => navigate({ to: '/pruefungen' })}><ArrowLeft className="h-4 w-4" />Zurück</Button>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 pt-4">
        {/* Linke Seite - Bildergalerie */}
        <div className="space-y-4">
          {/* Hauptbild */}
          <Card className="overflow-hidden border-2 p-0">
            <AspectRatio ratio={210 / 250}>
              <img
                src={images[selectedImage] || '/placeholder.svg'}
                alt={`Prüfung Seite ${selectedImage + 1}`}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </Card>

          {/* Thumbnail-Galerie */}
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <AspectRatio ratio={210 / 250}>
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-lg border-2 transition-all hover:border-primary ${selectedImage === index ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                    }`}
                >
                  <img
                    src={image || '/placeholder.svg'}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              </AspectRatio>
            ))}
          </div>
        </div>

        {/* Rechte Seite - Prüfungsinformationen */}
        <div className="space-y-6">
          {/* Titel */}
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl">{pruefung.titel}</h1>
          </div>

          {/* Bewertung */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= Math.floor(pruefung.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : star - 0.5 <= pruefung.rating
                      ? 'fill-amber-400/50 text-amber-400'
                      : 'fill-muted text-muted'
                    }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{pruefung.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({totalReviews} Bewertungen)</span>
          </div>

          <Separator />

          {/* Uploader Info */}
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-medium">Hochgeladen von</p>
              <p className="text-base font-semibold">{pruefung.benutzer}</p>
              <p className="text-xs text-muted-foreground">{uploadDate}</p>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="flex-1 gap-2" onClick={() => {
              toast.success('Prüfung erfolgreich heruntergeladen')
              setDownloaded(true)
            }}>
              <Download className="h-5 w-5" />
              Herunterladen
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={!downloaded}
              className="flex-1 gap-2 bg-transparent"
              onClick={() => navigate({ to: '/bewertungen/$id', params: { id } })}
            >
              <Star className="h-5 w-5" />
              Bewerten
            </Button>
          </div>

          <Separator />

          {/* Prüfungsdetails */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Prüfungsdetails</h2>

            <div className="space-y-3">
              {/* Fach */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-muted-foreground">Fach</span>
                <span className="text-right text-sm font-semibold">{pruefung.fach}</span>
              </div>

              {/* Thema */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-muted-foreground">Thema</span>
                <span className="text-right text-sm font-semibold">{pruefung.thema}</span>
              </div>

              {/* Tags */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-muted-foreground">Tags</span>
                <div className="flex flex-wrap justify-end gap-2">
                  <Badge key={pruefung.tag} variant="secondary">
                    {pruefung.tag}
                  </Badge>
                </div>
              </div>

              {/* Lehrperson */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-muted-foreground">Lehrperson</span>
                <span className="text-right text-sm font-semibold">{pruefung.lehrperson}</span>
              </div>

              {/* Lösung vorhanden */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-muted-foreground">Lösung vorhanden</span>
                <div className="flex items-center gap-2">
                  {pruefung.loesungVorhanden ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">Ja</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-semibold text-muted-foreground">Nein</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
