"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, PlusCircle } from "lucide-react";

interface FilterToolbarProps {
  resourceType?: string; // e.g., "Books", "Notes"
  onAddNew?: () => void; // Placeholder for add new item functionality
}

export function FilterToolbar({ resourceType, onAddNew }: FilterToolbarProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-card shadow">
      <Input
        placeholder={`Search ${resourceType || 'resources'}...`}
        className="flex-grow sm:max-w-xs"
      />
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {/* Add category options dynamically based on resourceType */}
          <SelectItem value="cs">Computer Science</SelectItem>
          <SelectItem value="history">History</SelectItem>
          <SelectItem value="math">Mathematics</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline">
        <Filter className="mr-2 h-4 w-4" />
        More Filters
      </Button>
      {onAddNew && (
         <Button onClick={onAddNew} className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New {resourceType ? resourceType.slice(0, -1) : 'Item'}
         </Button>
      )}
    </div>
  );
}
