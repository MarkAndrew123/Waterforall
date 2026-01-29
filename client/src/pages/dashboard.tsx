import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertStorySchema, type Story, type InsertStory } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ImagePlus, Send, MapPin, User, Pencil, Camera } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function StoriesDashboard() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetch stories
  const { data: stories = [], isLoading } = useQuery<Story[]>({
    queryKey: ["/api/stories"],
  });

  // Form setup
  const form = useForm<InsertStory>({
    resolver: zodResolver(insertStorySchema),
    defaultValues: {
      authorName: "",
      location: "",
      caption: "",
      description: "",
      imageUrl: "",
    },
  });

  // Create story mutation
  const createStoryMutation = useMutation({
    mutationFn: async (data: InsertStory) => {
      const res = await apiRequest("POST", "/api/stories", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stories"] });
      toast({
        title: "Story Shared!",
        description: "Your story has been successfully posted to the community feed.",
      });
      form.reset();
      setPreviewImage(null);
      setIsSubmitting(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post story. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertStory) => {
    setIsSubmitting(true);
    // In a real app, we'd handle file upload here.
    // For now, if no image URL is provided, we use a placeholder or the preview (base64)
    if (!data.imageUrl && previewImage) {
      data.imageUrl = previewImage;
    } else if (!data.imageUrl) {
      // Fallback for demo if neither URL nor file uploaded
      data.imageUrl = "https://images.unsplash.com/photo-1541976844346-f18aeac57230?q=80&w=2070&auto=format&fit=crop";
    }
    createStoryMutation.mutate(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        form.setValue("imageUrl", base64String); // Set base64 string as imageUrl
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Upload Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Pencil className="h-5 w-5" />
                    Tell Your Story
                  </CardTitle>
                  <CardDescription className="text-cyan-100">
                    Share your impact, testimonials, or project updates with the community.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                      <FormField
                        control={form.control}
                        name="authorName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input placeholder="John Doe" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input placeholder="Lagos, Nigeria" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="caption"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title / Caption</FormLabel>
                            <FormControl>
                              <Input placeholder="New well in our village!" font-semibold {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Story Details</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us more about this success story..."
                                className="resize-none h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <FormLabel>Upload Photo</FormLabel>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <label
                              htmlFor="image-upload"
                              className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                            >
                              {previewImage ? (
                                <img src={previewImage} alt="Preview" className="h-full object-cover rounded-lg" />
                              ) : (
                                <div className="flex flex-col items-center pt-2 pb-3">
                                  <Camera className="w-8 h-8 text-slate-400 mb-1" />
                                  <p className="text-xs text-slate-500">Click to upload image</p>
                                </div>
                              )}
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sharing...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Post Story
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column: Stories Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ImagePlus className="h-6 w-6 text-blue-600" />
              Community Stories Feed
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              </div>
            ) : stories.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-slate-500">
                  <p className="text-lg">No stories yet. Be the first to share!</p>
                </CardContent>
              </Card>
            ) : (
              stories.map((story) => ( // Stories are already sorted by date from backend
                <Card key={story.id} className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white">
                  {/* Author Header */}
                  <div className="p-4 flex items-center gap-3 border-b border-slate-50">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-blue-600 font-bold">
                      {story.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{story.authorName}</p>
                      <div className="flex items-center text-xs text-slate-500 gap-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {story.location}
                        </span>
                        <span>•</span>
                        <span>{story.createdAt ? formatDistanceToNow(new Date(story.createdAt), { addSuffix: true }) : 'Just now'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Caption & Description */}
                  <div className="px-4 py-3">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{story.caption}</h3>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{story.description}</p>
                  </div>

                  {/* Image */}
                  <div className="w-full max-h-[500px] overflow-hidden bg-slate-100">
                    <img
                      src={story.imageUrl}
                      alt={story.caption}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                      loading="lazy"
                    />
                  </div>

                  {/* Footer Actions (Mock) */}
                  <div className="px-4 py-3 border-t border-slate-50 flex gap-4">
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600">
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600">
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 ml-auto">
                      Share
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
