"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockBooks } from '@/lib/mock-data';
import type { Book } from '@/lib/types';
import { ArrowLeft, ShoppingCart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function BookDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate fetching book data
      const foundBook = mockBooks.find(b => b.id === id);
      setTimeout(() => {
        setBook(foundBook || null);
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
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" /> {/* Title */}
            <Skeleton className="h-4 w-1/2" /> {/* Author */}
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <Skeleton className="aspect-[3/4] w-full rounded-md" /> {/* Image */}
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
              <Skeleton className="h-4 w-5/6" /> {/* Description line 2 */}
              <Skeleton className="h-4 w-1/3" /> {/* Condition */}
              <Skeleton className="h-4 w-1/4" /> {/* Price/Exchange */}
              <div className="flex flex-wrap gap-2 mt-2">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-6 w-20 rounded-full" />)} {/* Tags */}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Skeleton className="h-6 w-1/3" /> {/* Posted by */}
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28" /> {/* Button 1 */}
              <Skeleton className="h-10 w-28" /> {/* Button 2 */}
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-semibold">Book not found</h1>
        <Link href="/books">
          <Button variant="link" className="mt-4">Go back to books</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/books" legacyBehavior>
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
        </Button>
      </Link>
      <Card className="max-w-4xl mx-auto shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 p-6">
          <CardTitle className="text-3xl font-bold">{book.title}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">by {book.author}</CardDescription>
           {book.category && <Badge variant="secondary" className="w-fit mt-2">{book.category}</Badge>}
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-2 gap-x-8 gap-y-6">
          {book.imageUrl && (
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto md:mx-0">
              <Image
                src={book.imageUrl}
                alt={book.title}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
                data-ai-hint={(book as any).dataAiHint || book.type}
              />
            </div>
          )}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Description</h3>
              <p className="text-sm text-muted-foreground">{book.description}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Condition</h3>
              <p className="text-sm text-muted-foreground capitalize">{book.condition}</p>
            </div>
            {book.price && (
              <div>
                <h3 className="font-semibold text-foreground mb-1">Price</h3>
                <p className="text-2xl font-bold text-primary">${book.price.toFixed(2)}</p>
              </div>
            )}
            {book.exchangeDetails && (
              <div>
                <h3 className="font-semibold text-foreground mb-1">Exchange Details</h3>
                <p className="text-sm text-muted-foreground">{book.exchangeDetails}</p>
              </div>
            )}
            {book.isbn && (
              <div>
                <h3 className="font-semibold text-foreground mb-1">ISBN</h3>
                <p className="text-sm text-muted-foreground">{book.isbn}</p>
              </div>
            )}
            {book.tags && book.tags.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-foreground mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-muted-foreground">Listed by: <strong>{book.listedBy}</strong></p>
          <div className="flex gap-2">
            <Button>
              <ShoppingCart className="mr-2 h-4 w-4" /> {book.price ? 'Buy Now' : 'Request Item'}
            </Button>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" /> Contact Seller
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
