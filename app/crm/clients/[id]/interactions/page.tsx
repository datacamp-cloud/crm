"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  CalendarDays,
  Filter,
  ListChecks,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  ShoppingBag,
  UserCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn, formatDate, generateClients, generateInteractions } from "@/lib/data-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const clients = generateClients(25);

const interactionFormSchema = z.object({
  type: z.string().min(1, "Interaction type is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export default function ClientInteractionsPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<any>(null);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [filteredInteractions, setFilteredInteractions] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof interactionFormSchema>>({
    resolver: zodResolver(interactionFormSchema),
    defaultValues: {
      type: "",
      description: "",
    },
  });

  useEffect(() => {
    if (params.id) {
      const foundClient = clients.find((c) => c.id === params.id);
      if (foundClient) {
        setClient(foundClient);
        const allInteractions = generateInteractions(foundClient.id, 30);
        setInteractions(allInteractions);
        setFilteredInteractions(allInteractions);
      }
    }
  }, [params.id]);

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredInteractions(interactions);
    } else {
      setFilteredInteractions(
        interactions.filter((interaction) => activeFilters.includes(interaction.type))
      );
    }
  }, [activeFilters, interactions]);

  if (!client) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const toggleFilter = (type: string) => {
    if (activeFilters.includes(type)) {
      setActiveFilters(activeFilters.filter((filter) => filter !== type));
    } else {
      setActiveFilters([...activeFilters, type]);
    }
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "Purchase":
        return <ShoppingBag className="h-4 w-4" />;
      case "Email":
        return <Mail className="h-4 w-4" />;
      case "Call":
        return <Phone className="h-4 w-4" />;
      case "Support":
        return <MessageSquare className="h-4 w-4" />;
      case "Event":
        return <CalendarDays className="h-4 w-4" />;
      case "Note":
        return <ListChecks className="h-4 w-4" />;
      default:
        return <UserCircle className="h-4 w-4" />;
    }
  };

  const onSubmit = (data: z.infer<typeof interactionFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newInteraction = {
        id: `interaction-${Date.now()}`,
        clientId: client.id,
        type: data.type,
        date: new Date().toISOString(),
        description: data.description,
      };
      
      setInteractions([newInteraction, ...interactions]);
      setIsSubmitting(false);
      setDialogOpen(false);
      form.reset();
      toast.success("Interaction added successfully");
    }, 1000);
  };

  return (
    <div className="p-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(`/crm/clients/view/${client.id}`)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Client Profile
      </Button>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{client.name} - Interactions</h1>
          <p className="text-muted-foreground">
            View and manage all client interactions
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Interaction</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Interaction</DialogTitle>
              <DialogDescription>
                Record a new interaction with this client
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interaction Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interaction type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Purchase">Purchase</SelectItem>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="Call">Call</SelectItem>
                          <SelectItem value="Support">Support</SelectItem>
                          <SelectItem value="Event">Event</SelectItem>
                          <SelectItem value="Note">Note</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the interaction..." 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding
                      </>
                    ) : (
                      "Add Interaction"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </CardTitle>
            <CardDescription>
              Filter interactions by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="filter-purchase" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Purchases</span>
                </Label>
                <Input
                  id="filter-purchase"
                  type="checkbox"
                  className="h-4 w-4"
                  checked={activeFilters.includes("Purchase")}
                  onChange={() => toggleFilter("Purchase")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="filter-email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Emails</span>
                </Label>
                <Input
                  id="filter-email"
                  type="checkbox"
                  className="h-4 w-4"
                  checked={activeFilters.includes("Email")}
                  onChange={() => toggleFilter("Email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="filter-call" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Calls</span>
                </Label>
                <Input
                  id="filter-call"
                  type="checkbox"
                  className="h-4 w-4"
                  checked={activeFilters.includes("Call")}
                  onChange={() => toggleFilter("Call")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="filter-support" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Support</span>
                </Label>
                <Input
                  id="filter-support"
                  type="checkbox"
                  className="h-4 w-4"
                  checked={activeFilters.includes("Support")}
                  onChange={() => toggleFilter("Support")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="filter-event" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Events</span>
                </Label>
                <Input
                  id="filter-event"
                  type="checkbox"
                  className="h-4 w-4"
                  checked={activeFilters.includes("Event")}
                  onChange={() => toggleFilter("Event")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="filter-note" className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4" />
                  <span>Notes</span>
                </Label>
                <Input
                  id="filter-note"
                  type="checkbox"
                  className="h-4 w-4"
                  checked={activeFilters.includes("Note")}
                  onChange={() => toggleFilter("Note")}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setActiveFilters([])}
                disabled={activeFilters.length === 0}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interaction Timeline</CardTitle>
            <CardDescription>
              Chronological history of all interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredInteractions.length > 0 ? (
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 h-full w-px bg-border" />
                
                {filteredInteractions.map((interaction, index) => (
                  <div key={interaction.id} className="mb-8 last:mb-0">
                    <div
                      className={cn(
                        "absolute left-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border",
                        {
                          "bg-blue-500 text-white": interaction.type === "Email",
                          "bg-green-500 text-white": interaction.type === "Purchase",
                          "bg-amber-500 text-white": interaction.type === "Event",
                          "bg-purple-500 text-white": interaction.type === "Call",
                          "bg-red-500 text-white": interaction.type === "Support",
                          "bg-gray-500 text-white": interaction.type === "Note",
                        }
                      )}
                      style={{ top: index * 32 + 4 }}
                    >
                      {getInteractionIcon(interaction.type)}
                    </div>
                    <div className="flex flex-col space-y-1 pb-4">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{interaction.description}</p>
                        <Badge variant="outline" className="ml-auto">
                          {interaction.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(interaction.date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-center text-muted-foreground">No interactions found with the selected filters.</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => setActiveFilters([])}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}