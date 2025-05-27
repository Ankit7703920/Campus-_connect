"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceCard } from "@/components/resource-card";
import { FilterToolbar } from "@/components/filter-toolbar";
import { mockBooks, mockNotes, mockGigs, mockMeals, mockAllResources } from "@/lib/mock-data";
import type { AnyResource, ResourceType } from "@/lib/types";
import { Skeleton } from '@/components/ui/skeleton';

const ResourceGrid = ({ resources }: { resources: AnyResource[] }) => {
  if (!resources.length) {
    return <p className="text-center text-muted-foreground py-8">No resources found in this category.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};

const LoadingSkeletons = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ))}
  </div>
);


export default function BrowsePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState<ResourceType | 'all'>('all');

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddNew = () => {
    // Placeholder for future "Add New Item" functionality
    alert(`Add new ${currentTab === 'all' ? 'item' : currentTab} form would open here.`);
  };

  const resourceTypes: { value: ResourceType | 'all'; label: string; data: AnyResource[] }[] = [
    { value: 'all', label: 'All Resources', data: mockAllResources },
    { value: 'book', label: 'Books', data: mockBooks },
    { value: 'note', label: 'Notes', data: mockNotes },
    { value: 'gig', label: 'Gigs', data: mockGigs },
    { value: 'meal', label: 'Meals', data: mockMeals },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Resources</h1>
      
      <FilterToolbar resourceType={currentTab === 'all' ? 'Resources' : resourceTypes.find(rt => rt.value === currentTab)?.label} onAddNew={handleAddNew} />

      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setCurrentTab(value as ResourceType | 'all')}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6">
          {resourceTypes.map(rt => (
            <TabsTrigger key={rt.value} value={rt.value}>{rt.label}</TabsTrigger>
          ))}
        </TabsList>

        {resourceTypes.map(rt => (
          <TabsContent key={rt.value} value={rt.value}>
            {isLoading ? <LoadingSkeletons /> : <ResourceGrid resources={rt.data} />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
