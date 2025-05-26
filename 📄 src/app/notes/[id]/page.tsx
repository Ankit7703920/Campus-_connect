"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockNotes } from '@/lib/mock-data';
import type { Note } from '@/lib/types';
import { ArrowLeft, Download, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function NoteDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundNote = mockNotes.find(n => n.id === id);
      setTimeout(() => {
        setNote(foundNote || null);
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
            <Skeleton className="h-4 w-1/2" /> {/* Course */}
          </CardHeader>
          <CardContent className="space-y-4">
             {/* No large image for notes usually, so smaller content skeletons */}
            <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
            <Skeleton className="h-4 w-5/6" /> {/* Description line 2 */}
            <Skeleton className="h-4 w-1/3" /> {/* Professor */}
            <Skeleton className="h-4 w-1/4" /> {/* File Type */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-6 w-20 rounded-full" />)} {/* Tags */}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Skeleton className="h-6 w-1/3" /> {/* Uploaded by */}
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28" /> {/* Button 1 */}
              <Skeleton className="h-10 w-28" /> {/* Button 2 */}
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-semibold">Note not found</h1>
        <Link href="/notes">
          <Button variant="link" className="mt-4">Go back to notes</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/notes" legacyBehavior>
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Notes
        </Button>
      </Link>
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="bg-muted/30 p-6">
          <CardTitle className="text-3xl font-bold">{note.title}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            For {note.courseName} {note.courseCode && `(${note.courseCode})`}
          </CardDescription>
          {note.category && <Badge variant="secondary" className="w-fit mt-2">{note.category}</Badge>}
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {note.imageUrl && (
             <div className="relative aspect-video w-full max-w-md mx-auto mb-4">
                <Image
                  src={note.imageUrl}
                  alt={note.title + " preview"}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md border"
                  data-ai-hint={(note as any).dataAiHint || note.type}
                />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground mb-1">Description</h3>
            <p className="text-sm text-muted-foreground">{note.description}</p>
          </div>
          {note.professorName && (
            <div>
              <h3 className="font-semibold text-foreground mb-1">Professor</h3>
              <p className="text-sm text-muted-foreground">{note.professorName}</p>
            </div>
          )}
          {note.fileType && (
            <div>
              <h3 className="font-semibold text-foreground mb-1">File Type</h3>
              <Badge variant="outline">{note.fileType}</Badge>
            </div>
          )}
          {note.tags && note.tags.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-foreground mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {note.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/30 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-muted-foreground">Uploaded by: <strong>{note.uploadedBy}</strong></p>
          <div className="flex gap-2">
            <Button asChild>
              <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" /> Download Notes
              </a>
            </Button>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" /> Contact Uploader
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
