import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AnyResource, Book, Note, Gig, Meal } from '@/lib/types';
import { BookOpen, FileText, Briefcase, Utensils, DollarSign, Tag, MapPin, Users, Clock, Info } from 'lucide-react';

interface ResourceCardProps {
  resource: AnyResource;
}

const ResourceIcon = ({ type, className }: { type: AnyResource['type'], className?: string }) => {
  const props = { className: cn('h-5 w-5 text-muted-foreground', className) };
  switch (type) {
    case 'book': return <BookOpen {...props} />;
    case 'note': return <FileText {...props} />;
    case 'gig': return <Briefcase {...props} />;
    case 'meal': return <Utensils {...props} />;
    default: return <Info {...props} />;
  }
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const renderSpecificDetails = () => {
    switch (resource.type) {
      case 'book':
        const book = resource as Book;
        return (
          <>
            <p className="text-sm text-muted-foreground">Author: {book.author}</p>
            <p className="text-sm text-muted-foreground">Condition: {book.condition}</p>
            {book.price && <p className="text-sm font-semibold">Price: ${book.price.toFixed(2)}</p>}
            {book.exchangeDetails && <p className="text-sm text-muted-foreground">Exchange: {book.exchangeDetails}</p>}
          </>
        );
      case 'note':
        const note = resource as Note;
        return (
          <>
            <p className="text-sm text-muted-foreground">Course: {note.courseName} ({note.courseCode})</p>
            {note.professorName && <p className="text-sm text-muted-foreground">Professor: {note.professorName}</p>}
            {note.fileType && <Badge variant="outline" className="mt-1">{note.fileType}</Badge>}
          </>
        );
      case 'gig':
        const gig = resource as Gig;
        return (
          <>
            <p className="text-sm text-muted-foreground flex items-center"><DollarSign className="h-4 w-4 mr-1" /> {gig.compensation}</p>
            {gig.location && <p className="text-sm text-muted-foreground flex items-center"><MapPin className="h-4 w-4 mr-1" /> {gig.location}</p>}
            {gig.duration && <p className="text-sm text-muted-foreground flex items-center"><Clock className="h-4 w-4 mr-1" /> {gig.duration}</p>}
          </>
        );
      case 'meal':
        const meal = resource as Meal;
        return (
          <>
            <p className="text-sm text-muted-foreground flex items-center"><Users className="h-4 w-4 mr-1" /> Quantity: {meal.quantity}</p>
            <p className="text-sm text-muted-foreground flex items-center"><Clock className="h-4 w-4 mr-1" /> Pickup: {meal.pickupTime}</p>
            <p className="text-sm text-muted-foreground flex items-center"><MapPin className="h-4 w-4 mr-1" /> At: {meal.pickupLocation}</p>
          </>
        );
      default:
        return null;
    }
  };

  const getPostedBy = () => {
    switch (resource.type) {
      case 'book': return (resource as Book).listedBy;
      case 'note': return (resource as Note).uploadedBy;
      case 'gig': return (resource as Gig).postedBy;
      case 'meal': return (resource as Meal).offeredBy;
      default: return 'N/A';
    }
  }

  const resourceLink = `/${resource.type}s/${resource.id}`; // e.g., /books/book1

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-4">
        {resource.imageUrl && (
          <div className="relative aspect-[3/2] w-full mb-2">
            <Image
              src={resource.imageUrl}
              alt={resource.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-md"
              data-ai-hint={(resource as any).dataAiHint || resource.type}
            />
          </div>
        )}
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight">
            <Link href={resourceLink} className="hover:text-primary transition-colors">
              {resource.title}
            </Link>
          </CardTitle>
          <ResourceIcon type={resource.type} className="h-6 w-6 text-primary" />
        </div>
        {resource.category && (
          <Badge variant="secondary" className="w-fit mt-1">{resource.category}</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <CardDescription className="mb-2 text-sm line-clamp-3">{resource.description}</CardDescription>
        {renderSpecificDetails()}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start">
        {resource.tags && resource.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {resource.tags.slice(0,3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />{tag}
              </Badge>
            ))}
          </div>
        )}
         <p className="text-xs text-muted-foreground">Posted by: {getPostedBy()}</p>
      </CardFooter>
    </Card>
  );
}

import { cn } from "@/lib/utils";
