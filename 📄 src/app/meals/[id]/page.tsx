"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockMeals } from '@/lib/mock-data';
import type { Meal } from '@/lib/types';
import { ArrowLeft, Utensils, MapPin, Clock, Users, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function MealDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundMeal = mockMeals.find(m => m.id === id);
      setTimeout(() => {
        setMeal(foundMeal || null);
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
            <Skeleton className="h-4 w-1/2" /> {/* Cuisine */}
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <Skeleton className="aspect-video w-full rounded-md" /> {/* Image */}
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
              <Skeleton className="h-4 w-5/6" /> {/* Description line 2 */}
              <Skeleton className="h-4 w-1/3" /> {/* Quantity */}
              <Skeleton className="h-4 w-1/2" /> {/* Pickup Time */}
              <Skeleton className="h-4 w-2/3" /> {/* Pickup Location */}
              <div className="flex flex-wrap gap-2 mt-2">
                {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-6 w-24 rounded-full" />)} {/* Dietary */}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-6 w-20 rounded-full" />)} {/* Tags */}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Skeleton className="h-6 w-1/3" /> {/* Offered by */}
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28" /> {/* Button 1 */}
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-semibold">Meal not found</h1>
        <Link href="/meals">
          <Button variant="link" className="mt-4">Go back to meals</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/meals" legacyBehavior>
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Meals
        </Button>
      </Link>
      <Card className="max-w-3xl mx-auto shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 p-6">
          <CardTitle className="text-3xl font-bold flex items-center">
            <Utensils className="mr-3 h-8 w-8 text-primary" /> {meal.title}
          </CardTitle>
          {meal.cuisineType && (
            <CardDescription className="text-lg text-muted-foreground mt-1">
              {meal.cuisineType} Cuisine
            </CardDescription>
          )}
           {meal.category && <Badge variant="secondary" className="w-fit mt-2">{meal.category}</Badge>}
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-2 gap-x-8 gap-y-6">
          {meal.imageUrl && (
             <div className="relative aspect-video w-full">
                <Image
                  src={meal.imageUrl}
                  alt={meal.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md border"
                  data-ai-hint={(meal as any).dataAiHint || meal.type}
                />
            </div>
          )}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Description</h3>
              <p className="text-sm text-muted-foreground">{meal.description}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-1 flex items-center"><Users className="mr-2 h-4 w-4 text-muted-foreground" />Quantity</h3>
              <p className="text-sm text-muted-foreground ml-6">{meal.quantity}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-1 flex items-center"><Clock className="mr-2 h-4 w-4 text-muted-foreground" />Pickup Time</h3>
              <p className="text-sm text-muted-foreground ml-6">{meal.pickupTime}</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-1 flex items-center"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" />Pickup Location</h3>
              <p className="text-sm text-muted-foreground ml-6">{meal.pickupLocation}</p>
            </div>
            
            {meal.dietaryRestrictions && meal.dietaryRestrictions.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center"><Info className="mr-2 h-4 w-4 text-muted-foreground" />Dietary Information</h3>
                <div className="flex flex-wrap gap-2 ml-6">
                  {meal.dietaryRestrictions.map(restriction => (
                    <Badge key={restriction} variant="outline" className="capitalize">{restriction}</Badge>
                  ))}
                </div>
              </div>
            )}

            {meal.tags && meal.tags.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-foreground mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {meal.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-muted-foreground">Offered by: <strong>{meal.offeredBy}</strong></p>
          <Button>
            <CheckCircle className="mr-2 h-4 w-4" /> Request Meal / More Info
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
