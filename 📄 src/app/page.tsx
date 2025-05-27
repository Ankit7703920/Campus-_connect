"use client";

import type React from 'react';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { resourceRecommendation, type ResourceRecommendationInput, type ResourceRecommendationOutput } from '@/ai/flows/resource-recommendation';
import { AIRecommendation, AnyResource } from '@/lib/types';
import { ResourceCard } from '@/components/resource-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles } from 'lucide-react';
import { mockAllResources } from '@/lib/mock-data'; // For linking to mock details

const recommendationFormSchema = z.object({
  userProfile: z.string().min(10, { message: "Please provide a brief user profile (min 10 characters)." }),
  pastActivity: z.string().min(10, { message: "Please describe your past activity (min 10 characters)." }),
});

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<AIRecommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof recommendationFormSchema>>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      userProfile: "",
      pastActivity: "",
    },
  });

  async function onSubmit(values: z.infer<typeof recommendationFormSchema>) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const result: ResourceRecommendationOutput = await resourceRecommendation(values);
      // The AI output might have relative links or just titles. We need to map them to our mock data for display.
      // For now, we'll display what the AI gives, assuming links are absolute or handled by ResourceCard.
      // In a real app, you'd fetch actual resource details based on AI output.
      setRecommendations(result.recommendations);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // This function tries to find a mock resource that matches the AI recommendation title and type
  // to enrich it with an image and a valid internal link for the ResourceCard.
  // This is a simplified approach for demonstration.
  const mapAiRecommendationToResourceCardProps = (rec: AIRecommendation): AnyResource => {
    const matchedMockResource = mockAllResources.find(
      (mock) => mock.title.toLowerCase() === rec.title.toLowerCase() && mock.type === rec.resourceType
    );

    return {
      id: matchedMockResource?.id || encodeURIComponent(rec.title),
      title: rec.title,
      description: rec.description,
      type: rec.resourceType,
      imageUrl: matchedMockResource?.imageUrl || `https://placehold.co/300x200.png?text=${encodeURIComponent(rec.title)}`,
      dataAiHint: matchedMockResource ? (matchedMockResource as any).dataAiHint : rec.resourceType,
      // Fill in minimal required fields for other types if not matched
      ...(rec.resourceType === 'book' && !matchedMockResource ? { author: 'N/A', condition: 'good', listedBy: 'AI Recommendation' } : {}),
      ...(rec.resourceType === 'note' && !matchedMockResource ? { courseName: 'N/A', fileUrl: '#', uploadedBy: 'AI Recommendation' } : {}),
      ...(rec.resourceType === 'gig' && !matchedMockResource ? { compensation: 'N/A', postedBy: 'AI Recommendation' } : {}),
      ...(rec.resourceType === 'meal' && !matchedMockResource ? { quantity: 'N/A', pickupTime: 'N/A', pickupLocation: 'N/A', offeredBy: 'AI Recommendation' } : {}),
      ...(matchedMockResource || {}) // Spread the matched resource to get all its properties
    } as AnyResource;
  };


  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Get Personalized Recommendations
          </CardTitle>
          <CardDescription>
            Tell us a bit about yourself and your recent activity on CampusConnect so we can suggest relevant resources for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Profile</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Computer Science student, interested in web development and history. Enjoys reading fiction."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pastActivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Recent CampusConnect Activity</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Recently browsed textbooks for algorithms, downloaded notes for HIST202, and looked for part-time tutoring gigs."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Recommendations...
                  </>
                ) : (
                  "Find Resources"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-8 max-w-2xl mx-auto">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && recommendations.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Here are your recommendations:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <ResourceCard key={index} resource={mapAiRecommendationToResourceCardProps(rec)} />
            ))}
          </div>
        </div>
      )}

      {recommendations && recommendations.length === 0 && !isLoading && (
         <Alert className="mt-8 max-w-2xl mx-auto">
           <Sparkles className="h-4 w-4" />
           <AlertTitle>No specific recommendations found</AlertTitle>
           <AlertDescription>We couldn't find specific recommendations based on your input. Try refining your profile or activity, or browse all available resources.</AlertDescription>
         </Alert>
      )}
    </div>
  );
}
