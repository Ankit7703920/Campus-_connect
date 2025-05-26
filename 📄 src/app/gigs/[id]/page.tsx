"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockGigs } from '@/lib/mock-data';
import type { Gig } from '@/lib/types';
import { ArrowLeft, Briefcase, DollarSign, MapPin, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function GigDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [gig, setGig] = useState<Gig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundGig = mockGigs.find(g => g.id === id);
      setTimeout(() => {
        setGig(foundGig || null);
        setIsLoading(false);
      }, 300);
    } else {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
       <div className="container mx-auto py-8">
        <Skeleton className="h-8 w-32 mb-4" /> {/* Back button */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" /> {/* Title */}
            <Skeleton className="h-6 w-1/2" /> {/* Compensation */}
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
            <Skeleton className="h-4 w-5/6" /> {/* Description line 2 */}
            <Skeleton className="h-4 w-1/3" /> {/* Location */}
            <Skeleton className="h-4 w-1/4" /> {/* Duration */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-6 w-24 rounded-full" />)} {/* Skills */}
            </div>
             <div className="flex flex-wrap gap-2 mt-2">
              {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-6 w-20 rounded-full" />)} {/* Tags */}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Skeleton className="h-6 w-1/3" /> {/* Posted by */}
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28" /> {/* Button 1 */}
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-semibold">Gig not found</h1>
        <Link href="/gigs">
          <Button variant="link" className="mt-4">Go back to gigs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/gigs" legacyBehavior>
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gigs
        </Button>
      </Link>
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="bg-muted/30 p-6">
          <CardTitle className="text-3xl font-bold flex items-center">
            <Briefcase className="mr-3 h-8 w-8 text-primary" /> {gig.title}
          </CardTitle>
          <CardDescription className="text-xl font-semibold text-primary flex items-center mt-1">
             <DollarSign className="mr-1 h-5 w-5" /> {gig.compensation}
          </CardDescription>
           {gig.category && <Badge variant="secondary" className="w-fit mt-2">{gig.category}</Badge>}
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {gig.imageUrl && (
             <div className="relative aspect-video w-full max-w-md mx-auto mb-4">
                <Image
                  src={gig.imageUrl}
                  alt={gig.title + " visual"}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md border"
                  data-ai-hint={(gig as any).dataAiHint || gig.type}
                />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground mb-1">Job Description</h3>
            <p className="text-sm text-muted-foreground">{gig.description}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gig.location && (
              <div>
                <h3 className="font-semibold text-foreground mb-1 flex items-center"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" />Location</h3>
                <p className="text-sm text-muted-foreground ml-6">{gig.location}</p>
              </div>
            )}
            {gig.duration && (
              <div>
                <h3 className="font-semibold text-foreground mb-1 flex items-center"><Clock className="mr-2 h-4 w-4 text-muted-foreground" />Duration</h3>
                <p className="text-sm text-muted-foreground ml-6">{gig.duration}</p>
              </div>
            )}
          </div>

          {gig.skillsRequired && gig.skillsRequired.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-2">Skills Required</h3>
              <ul className="list-none space-y-1">
                {gig.skillsRequired.map(skill => (
                  <li key={skill} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {gig.tags && gig.tags.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-foreground mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {gig.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/30 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-muted-foreground">Posted by: <strong>{gig.postedBy}</strong></p>
          <Button>
             <CheckCircle className="mr-2 h-4 w-4" /> Apply / Express Interest
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
