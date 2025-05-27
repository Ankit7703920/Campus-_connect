"use client";

import { useState, useEffect } from 'react';
import { ResourceCard } from "@/components/resource-card";
import { FilterToolbar } from "@/components/filter-toolbar";
import { mockBooks } from "@/lib/mock-data";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const LoadingSkeletons = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(mockBooks.length || 4)].map((_, i) => (
      <div key={i} className="flex flex-col space-y-3">
        <Skeleton className="h-[200px] w-full rounded-xl" /> {/* Adjusted height for book card image */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    ))}
  </div>
);

export default function BooksPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddNewBook = () => {
    alert("Add new book form placeholder");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Book Exchange</h1>
        <Button onClick={handleAddNewBook}>
          <PlusCircle className="mr-2 h-5 w-5" /> List a Book
        </Button>
      </div>
      
      <FilterToolbar resourceType="Books" onAddNew={handleAddNewBook}/>

      {isLoading ? <LoadingSkeletons /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockBooks.map((book) => (
            <ResourceCard key={book.id} resource={book} />
          ))}
        </div>
      )}
       {!isLoading && mockBooks.length === 0 && (
        <p className="text-center text-muted-foreground py-8 col-span-full">No books listed yet. Be the first to add one!</p>
      )}
    </div>
  );
}
