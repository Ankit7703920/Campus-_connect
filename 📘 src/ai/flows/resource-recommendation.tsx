'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResourceRecommendationInputSchema = z.object({
  userProfile: z
    .string()
    .describe('Summary of the user profile, including interests and academic background.'),
  pastActivity: z
    .string()
    .describe('Summary of the user past activity within the app, such as previous downloads, uploads, and likes.'),
});
export type ResourceRecommendationInput = z.infer<
  typeof ResourceRecommendationInputSchema
>;

const ResourceRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      resourceType: z.enum(['book', 'note', 'gig', 'meal']),
      title: z.string().describe('The title of the resource.'),
      description: z.string().describe('A brief description of the resource.'),
      link: z.string().url().describe('A link to the resource.'),
    })
  ),
});
export type ResourceRecommendationOutput = z.infer<
  typeof ResourceRecommendationOutputSchema
>;

export async function resourceRecommendation(
  input: ResourceRecommendationInput
): Promise<ResourceRecommendationOutput> {
  return resourceRecommendationFlow(input);
}

const resourceRecommendationPrompt = ai.definePrompt({
  name: 'resourceRecommendationPrompt',
  input: {
    schema: ResourceRecommendationInputSchema,
  },
  output: {
    schema: ResourceRecommendationOutputSchema,
  },
  prompt: `You are an AI assistant designed to provide personalized resource recommendations to students.

  Based on the user's profile and past activity, suggest relevant resources such as books, notes, gigs, and meals available within the CampusConnect platform.
  Provide a list of recommendations, including the resource type, title, a brief description, and a direct link to the resource.

  User Profile: {{{userProfile}}}
  Past Activity: {{{pastActivity}}}

  Format your response as a JSON object matching the following schema:
  ${JSON.stringify(ResourceRecommendationOutputSchema.describe())}`,
});

const resourceRecommendationFlow = ai.defineFlow(
  {
    name: 'resourceRecommendationFlow',
    inputSchema: ResourceRecommendationInputSchema,
    outputSchema: ResourceRecommendationOutputSchema,
  },
  async input => {
    const {output} = await resourceRecommendationPrompt(input);
    return output!;
  }
);
