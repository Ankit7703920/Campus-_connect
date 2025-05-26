"use client";

import { useState, useEffect } from 'react';
import { ResourceCard } from "@/components/resource-card";
import { FilterToolbar } from "@/components/filter-toolbar";
import { mockMeals } from "@/lib/mock-data";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const LoadingSkeletons = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(mockMeals.length || 4)].map((_, i) => (
      <div key={i} className="flex flex-col space-y-3">
        <Skeleton className="h-[150px] w-full rounded-xl" /> {/* Adjusted height for meal card image */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

export default function MealsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const handleAddNewMeal = () => {
    alert("Add new meal form placeholder");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meal Sharing</h1>
        <Button onClick={handleAddNewMeal}>
          <PlusCircle className="mr-2 h-5 w-5" /> Offer a Meal
        </Button>
      </div>
      
      <FilterToolbar resourceType="Meals" onAddNew={handleAddNewMeal}/>
      
      {isLoading ? <LoadingSkeletons /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockMeals.map((meal) => (
            <ResourceCard key={meal.id} resource={meal} />
          ))}
        </div>
      )}
      {!isLoading && mockMeals.length === 0 && (
        <p className="text-center text-muted-foreground py-8 col-span-full">No meals available right now. Check back later or offer one yourself!</p>
      )}
    </div>
  );
}
