import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Users, Star, FileText } from "lucide-react"

interface UserCardProps {
    name: string
    handle: string
    avatarUrl?: string
    verified?: boolean
    downloads: number
    likes: number
    followers: number
    models: number
    description: string
    accentColor?: string
}

export function UserCard({
    name,
    handle,
    avatarUrl,
    verified = false,
    downloads,
    likes,
    followers,
    models,
    description,
    accentColor = "#84cc16",
}: UserCardProps) {
    // Extrahiere Initialen aus dem Namen
    const getInitials = (name: string) => {
        const parts = name.trim().split(" ")
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        }
        return name.substring(0, 2).toUpperCase()
    }

    return (
        <Card className="w-full max-w-md overflow-hidden">
            <CardContent className="p-0">
                {/* Header Background - placehold.co Bild */}
                <div className="h-24 relative">
                    <img
                        src="https://placehold.co/400x96/f8f9fa/737373?text=+"
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: `radial-gradient(circle at 30% 50%, ${accentColor}, transparent 70%)`,
                        }}
                    />
                </div>

                {/* Avatar */}
                <div className="px-6 -mt-12 relative z-10">
                    <Avatar className="w-24 h-24 border-4 ring-4 ring-card" style={{ borderColor: accentColor }}>
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback className="bg-muted text-foreground text-2xl">
                            {getInitials(name)}
                        </AvatarFallback>
                    </Avatar>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 pt-4 space-y-4">
                    {/* Name and Handle */}
                    <div className="text-center space-y-1">
                        <div className="flex items-center justify-center gap-2">
                            <h3 className="text-xl font-semibold text-card-foreground">{name}</h3>
                            {verified && (
                                <Badge
                                    className="rounded-full p-0 w-5 h-5 flex items-center justify-center"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">{handle}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-6 py-3 border-y border-border">
                        <div className="flex items-center gap-2 text-foreground">
                            <Download className="w-4 h-4" />
                            <span className="font-semibold">{downloads}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground">
                            <Star className="w-4 h-4" />
                            <span className="font-semibold">{likes}</span>
                        </div>
                    </div>

                    {/* Followers and Models */}
                    <div className="flex items-center justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-card-foreground font-semibold">{followers}</span>
                            <span className="text-muted-foreground">Follower</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-card-foreground font-semibold">{models}</span>
                            <span className="text-muted-foreground">Prüfungen</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

