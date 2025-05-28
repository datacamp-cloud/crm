"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Award, ChevronDown, ChevronUp, Gift, Plus, Star, Users } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { generateClients } from "@/lib/data-utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
// import { Client } from "@/app/types"; 


interface Client {
  id: string;
  name: string;
  email: string;
  points: number;
  tier: "Bronze" | "Silver" | "Gold";
  lastActivity: string;
}

export default function LoyaltyPage() {
  const [clients, setClients] = React.useState<Client[]>([]);
  const [sortedClients, setSortedClients] = React.useState<Client[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Chart data
  const [pointsData] = React.useState([
    { month: "Jan", points: 1200 },
    { month: "Feb", points: 1900 },
    { month: "Mar", points: 1500 },
    { month: "Apr", points: 2400 },
    { month: "May", points: 1800 },
    { month: "Jun", points: 2800 },
    { month: "Jul", points: 3200 },
    { month: "Aug", points: 2700 },
    { month: "Sep", points: 3500 },
    { month: "Oct", points: 3900 },
    { month: "Nov", points: 3300 },
    { month: "Dec", points: 4100 },
  ]);

  const [tierData, setTierData] = React.useState<{ name: string; value: number }[]>([]);

  React.useEffect(() => {
    // Simulate data fetching
    const generateData = () => {
      try {
        const generatedClients = generateClients(25).map((client) => ({
          ...client,
          points: Math.floor(Math.random() * 5000),
          tier: (Math.random() > 0.7 ? "Gold" : Math.random() > 0.4 ? "Silver" : "Bronze") as "Bronze" | "Silver" | "Gold",
          lastActivity: new Date(
            Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
          ).toISOString(),
        }));

        setClients(generatedClients);
        setSortedClients([...generatedClients].sort((a, b) => b.points - a.points));
        setTierData([
          { name: "Bronze", value: generatedClients.filter((c) => c.tier === "Bronze").length },
          { name: "Silver", value: generatedClients.filter((c) => c.tier === "Silver").length },
          { name: "Gold", value: generatedClients.filter((c) => c.tier === "Gold").length },
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error generating data:", error);
        setIsLoading(false);
      }
    };

    generateData();
  }, []);

  const clientColumns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: { row: { original: Client; getValue: (key: string) => string } }) => {
        const client = row.original;
        const initials = client.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span>{client.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "tier",
      header: "Tier",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
        const tier = row.getValue("tier") as string;
        const color =
          tier === "Gold" ? "bg-yellow-500" : tier === "Silver" ? "bg-gray-400" : "bg-amber-700";

        return <Badge className={color}>{tier}</Badge>;
      },
    },
    {
      accessorKey: "points",
      header: "Points",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
        const points = Number(row.getValue("points"));
        const previousPoints = points - Math.floor(Math.random() * 200);
        const isUp = points > previousPoints;

        return (
          <div className="flex items-center gap-1">
            <span className="font-medium">{points}</span>
            <span className={`flex items-center text-xs ${isUp ? "text-green-500" : "text-red-500"}`}>
              {isUp ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {Math.abs(points - previousPoints)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "lastActivity",
      header: "Last Activity",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
        const date = new Date(row.getValue("lastActivity"));
        return date.toLocaleDateString();
      },
    },
  ];

  const rewardColumns = [
    {
      accessorKey: "name",
      header: "Reward",
      cell: () => {
        const rewards = [
          "Free shipping",
          "10% discount",
          "Free product",
          "Early access",
          "Double points",
        ];

        return rewards[Math.floor(Math.random() * rewards.length)];
      },
    },
    {
      accessorKey: "points",
      header: "Points Required",
      cell: () => {
        return Math.floor(Math.random() * 1000) + 500;
      },
    },
    {
      accessorKey: "tier",
      header: "Minimum Tier",
      cell: () => {
        const tiers = ["Bronze", "Silver", "Gold"];
        const tier = tiers[Math.floor(Math.random() * tiers.length)];
        const color =
          tier === "Gold" ? "bg-yellow-500" : tier === "Silver" ? "bg-gray-400" : "bg-amber-700";

        return <Badge className={color}>{tier}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => {
        return (
          <Button size="sm" variant="outline">
            View Details
          </Button>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div>Loading loyalty program data...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loyalty Program</h1>
          <p className="text-muted-foreground">Manage client loyalty rewards and tiers</p>
        </div>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Add Reward</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loyalty Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.reduce((acc, client) => acc + client.points, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Points across all clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gold Tier Clients</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.filter((client) => client.tier === "Gold").length}
            </div>
            <p className="text-xs text-muted-foreground">Clients in highest tier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rewards</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Available rewards</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Points</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(clients.reduce((acc, client) => acc + client.points, 0) / clients.length)}
            </div>
            <p className="text-xs text-muted-foreground">Points per client</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Points Overview</CardTitle>
            <CardDescription>Loyalty points earned over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={pointsData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="points" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tier Distribution</CardTitle>
            <CardDescription>Distribution of clients across loyalty tiers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={tierData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clients" className="mt-6">
        <TabsList>
          <TabsTrigger value="clients">Top Clients</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="tiers">Tier Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle>Top Loyalty Clients</CardTitle>
              <CardDescription>Clients with the highest loyalty points</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={clientColumns}
                data={sortedClients.slice(0, 10)}
                searchKey="name"
                searchPlaceholder="Search clients..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>Manage rewards that clients can redeem</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={rewardColumns}
                data={Array(8).fill({})}
                searchKey="name"
                searchPlaceholder="Search rewards..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiers">
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Tier Requirements</CardTitle>
              <CardDescription>Points needed to reach each tier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-500">Gold</Badge>
                      <span className="font-medium">3000+ points</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Top 20% of clients</span>
                  </div>
                  <Progress value={100} className="h-2 bg-muted" />
                  <div className="text-sm text-muted-foreground">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Exclusive early access to new products</li>
                      <li>Free shipping on all orders</li>
                      <li>20% discount on selected items</li>
                      <li>Special birthday gifts</li>
                      <li>Dedicated account manager</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gray-400">Silver</Badge>
                      <span className="font-medium">1000-2999 points</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Middle 30% of clients</span>
                  </div>
                  <Progress value={60} className="h-2 bg-muted" />
                  <div className="text-sm text-muted-foreground">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Free shipping on orders over $50</li>
                      <li>10% discount on selected items</li>
                      <li>Birthday rewards</li>
                      <li>Priority customer service</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-700">Bronze</Badge>
                      <span className="font-medium">0-999 points</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Entry level</span>
                  </div>
                  <Progress value={30} className="h-2 bg-muted" />
                  <div className="text-sm text-muted-foreground">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Free shipping on orders over $100</li>
                      <li>5% discount on selected items</li>
                      <li>Access to members-only promotions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}