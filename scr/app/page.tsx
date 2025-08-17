import Link from 'next/link';
import Image from 'next/image';
import { Star, MessageCircle, Filter } from 'lucide-react';
import { projects } from '@/lib/data';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Header } from '@/components/header';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center justify-between mb-6 pt-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Student Portfolios</h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Skill</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>Patternmaking</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Digital Illustration</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Cinematography</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const firstImageUrl = project.mediaUrls[0] || 'https://placehold.co/600x400.png';
  const dataAiHint = project.id === 'p1' ? 'fashion design' : project.id === 'p2' ? 'digital art' : 'film noir';

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out">
      <Link href={`/projects/${project.id}`} className="block">
        <CardHeader className="p-0">
          <Image
            src={firstImageUrl}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={dataAiHint}
          />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold mb-2 truncate">{project.title}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Avatar className="h-6 w-6">
              <AvatarImage src={project.owner.avatarUrl} alt={project.owner.name} />
              <AvatarFallback>{project.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{project.owner.name}</span>
          </div>
          <div className="flex flex-wrap gap-1 h-6 overflow-hidden">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-muted/50 flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{project.avgRating}</span>
            <span className="text-muted-foreground">({project.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            <span>{project.reviews.length}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
