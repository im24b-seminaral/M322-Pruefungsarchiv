import { createFileRoute, useNavigate } from '@tanstack/react-router'
import * as React from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export const Route = createFileRoute('/bewertungen/$id')({
  component: BewertungPage,
})

function BewertungPage() {
  const navigate = useNavigate()
  const { id } = Route.useParams()
  const [rating, setRating] = React.useState(0)
  const [hoveredRating, setHoveredRating] = React.useState(0)
  const [comment, setComment] = React.useState('')

  // Dummy-Name für eingeloggten User - in einer echten App würde das aus einem Auth-Context kommen
  const loggedInUserName = 'Max Mustermann'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigiere zurück zur Prüfungsdetailseite
    navigate({ to: '/pruefungen/$id', params: { id } })
    // Zeige Toast
    toast.success('Prüfung erfolgreich bewertet')
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-2xl">
      <Card className="p-6 lg:p-8">
        <h1 className="text-2xl font-bold mb-6">Prüfung bewerten</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bewerter Name */}
          <div className="space-y-2">
            <Label htmlFor="bewerter">Bewerter</Label>
            <input
              id="bewerter"
              type="text"
              value={loggedInUserName}
              disabled
              className="w-full px-3 py-2 border border-input bg-muted rounded-md text-muted-foreground cursor-not-allowed"
            />
          </div>

          {/* Sterne-Bewertung */}
          <div className="space-y-2">
            <Label>Bewertung (Pflichtfeld)</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-muted text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                {rating} {rating === 1 ? 'Stern' : 'Sterne'} ausgewählt
              </p>
            )}
          </div>

          {/* Kommentar */}
          <div className="space-y-2">
            <Label htmlFor="kommentar">Kommentar (optional)</Label>
            <textarea
              id="kommentar"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Fügen Sie optional einen Kommentar hinzu..."
              rows={4}
              className="w-full px-3 py-2 border border-input bg-background rounded-md resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/pruefungen/$id', params: { id } })}
              className="flex-1"
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              disabled={rating === 0}
              className="flex-1"
            >
              Bewertung absenden
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

