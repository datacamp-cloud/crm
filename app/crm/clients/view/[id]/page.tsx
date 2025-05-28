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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  CalendarDays,
  Edit,
  BarChart3,
  ListChecks,
  Mail,
  MessageSquare,
  Phone,
  Settings,
  ShoppingBag,
  UserCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, formatDate, generateClients, generateInteractions } from "@/lib/data-utils";
import Link from "next/link";

const clients = generateClients(25);

export default function ClientViewPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<any>(null);
  const [interactions, setInteractions] = useState<any[]>([]);

  useEffect(() => {
    if (params.id) {
      const foundClient = clients.find((c) => c.id === params.id);
      if (foundClient) {
        setClient(foundClient);
        setInteractions(generateInteractions(foundClient.id));
      }
    }
  }, [params.id]);

  if (!client) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getClientTypeBadge = (type: string) => {
    switch (type) {
      case "Particular":
        return <Badge className="bg-blue-500">{type}</Badge>;
      case "Manager":
        return <Badge className="bg-purple-500">{type}</Badge>;
      case "Affiliate":
        return <Badge className="bg-green-500">{type}</Badge>;
      case "Vendor":
        return <Badge className="bg-amber-500">{type}</Badge>;
      default:
        return <Badge>{type}</Badge>;
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

  return (
    <div className="p-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Clients
      </Button>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">{getInitials(client.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
              {getClientTypeBadge(client.type)}
            </div>
            <p className="text-muted-foreground">Client since {new Date(client.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/crm/clients/[id]/interactions`} as={`/crm/clients/${client.id}/interactions`}>
            <Button variant="outline" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>Interactions</span>
            </Button>
          </Link>
          <Link href={`/crm/clients/edit/[id]`} as={`/crm/clients/edit/${client.id}`}>
            <Button className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <UserCircle className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="purchases" className="flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" />
            <span>Purchases</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Statistics</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Client's primary contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4 text-muted-foreground" />
                  <span>{client.type}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest interactions with this client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {interactions.slice(0, 5).map((interaction) => (
                    <div key={interaction.id} className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {getInteractionIcon(interaction.type)}
                      </div>
                      <div>
                        <p className="font-medium">{interaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(interaction.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Client Timeline</CardTitle>
                <CardDescription>
                  Chronological history of client interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 h-full w-px bg-border" />
                  
                  {interactions.slice(0, 10).map((interaction, index) => (
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>
                View all client purchases and order details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Purchase history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Client Statistics</CardTitle>
              <CardDescription>
                Analytics and metrics for this client
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Client statistics will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage client account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Account settings will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}