"use client";

import { useState, useEffect } from 'react';
import { ResourceCard } from "@/components/resource-card";
import { FilterToolbar } from "@/components/filter-toolbar";
import { mockNotes } from "@/lib/mock-data";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const LoadingSkeletons = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(mockNotes.length || 4)].map((_, i) => (
      <div key={i} className="flex flex-col space-y-3">
        <Skeleton className="h-[150px] w-full rounded-xl" /> {/* Adjusted height for note card image */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default function NotesPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const handleAddNewNote = () => {
    alert("Add new note form placeholder");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shared Notes</h1>
        <Button onClick={handleAddNewNote}>
          <PlusCircle className="mr-2 h-5 w-5" /> Share Notes
        </Button>
      </div>
      
      <FilterToolbar resourceType="Notes" onAddNew={handleAddNewNote} />

      {isLoading ? <LoadingSkeletons /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockNotes.map((note) => (
            <ResourceCard key={note.id} resource={note} />
          ))}
        </div>
      )}
      {!isLoading && mockNotes.length === 0 && (
        <p className="text-center text-muted-foreground py-8 col-span-full">No notes shared yet. Be the first to contribute!</p>
      )}
    </div>
  );
}
