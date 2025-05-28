"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, LinkIcon, Copy, Share2, Download, LogOut, Home, Eye, ChevronUp, ChevronDown, Link2, BarChart3 } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import { formatDate } from "@/lib/data-utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Sample data
const referrals = [
  {
    id: "REF-001",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    date: new Date(2025, 3, 15).toISOString(),
    status: "Active",
    commission: 45.99,
  },
  {
    id: "REF-002",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    date: new Date(2025, 3, 10).toISOString(),
    status: "Active",
    commission: 25.50,
  },
  {
    id: "REF-003",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    date: new Date(2025, 3, 5).toISOString(),
    status: "Pending",
    commission: 0,
  },
  {
    id: "REF-004",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    date: new Date(2025, 2, 28).toISOString(),
    status: "Inactive",
    commission: 15.75,
  },
];

const commissions = [
  {
    id: "COM-001",
    date: new Date(2025, 3, 15).toISOString(),
    amount: 45.99,
    referral: "Jane Smith",
    status: "Paid",
  },
  {
    id: "COM-002",
    date: new Date(2025, 3, 10).toISOString(),
    amount: 25.50,
    referral: "Robert Johnson",
    status: "Paid",
  },
  {
    id: "COM-003",
    date: new Date(2025, 3, 1).toISOString(),
    amount: 15.75,
    referral: "Michael Brown",
    status: "Pending",
  },
  {
    id: "COM-004",
    date: new Date(2025, 2, 20).toISOString(),
    amount: 30.25,
    referral: "Jane Smith",
    status: "Paid",
  },
  {
    id: "COM-005",
    date: new Date(2025, 2, 15).toISOString(),
    amount: 22.50,
    referral: "Robert Johnson",
    status: "Paid",
  },
];

// Generate data for charts
const monthlyData = [
  { month: 'Jan', commissions: 120, referrals: 3 },
  { month: 'Feb', commissions: 190, referrals: 5 },
  { month: 'Mar', commissions: 150, referrals: 4 },
  { month: 'Apr', commissions: 240, referrals: 7 },
  { month: 'May', commissions: 180, referrals: 4 },
  { month: 'Jun', commissions: 280, referrals: 8 },
  { month: 'Jul', commissions: 320, referrals: 9 },
  { month: 'Aug', commissions: 270, referrals: 7 },
  { month: 'Sep', commissions: 350, referrals: 11 },
  { month: 'Oct', commissions: 390, referrals: 12 },
  { month: 'Nov', commissions: 330, referrals: 10 },
  { month: 'Dec', commissions: 410, referrals: 13 },
];

const statusData = [
  { name: 'Active', value: 2 },
  { name: 'Pending', value: 1 },
  { name: 'Inactive', value: 1 },
];

const COLORS = ['#4CAF50', '#FFC107', '#F44336'];

export default function AffiliateDashboardPage() {
  const referralColumns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "date",
      header: "Joined",
      cell: ({ row }) => {
        return formatDate(row.getValue("date"));
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        let color = "";
        
        switch (status) {
          case "Active":
            color = "bg-green-500";
            break;
          case "Pending":
            color = "bg-amber-500";
            break;
          case "Inactive":
            color = "bg-gray-500";
            break;
          default:
            color = "bg-gray-500";
        }
        
        return <Badge className={color}>{status}</Badge>;
      },
    },
    {
      accessorKey: "commission",
      header: "Commission",
      cell: ({ row }) => {
        const commission = row.getValue("commission") as number;
        return (
          <div className="font-medium">
            ${commission.toFixed(2)}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: () => {
        return (
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>View</span>
          </Button>
        );
      },
    },
  ];
  
  const commissionColumns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return formatDate(row.getValue("date"));
      },
    },
    {
      accessorKey: "referral",
      header: "Referral",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        return (
          <div className="font-medium">
            ${amount.toFixed(2)}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        let color = "";
        
        switch (status) {
          case "Paid":
            color = "bg-green-500";
            break;
          case "Pending":
            color = "bg-amber-500";
            break;
          default:
            color = "bg-gray-500";
        }
        
        return <Badge className={color}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      cell: () => {
        return (
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Receipt</span>
          </Button>
        );
      },
    },
  ];
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText("https://example.com/ref/abc123");
    toast.success("Referral link copied to clipboard");
  };
  
  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-5 w-5" />
          <span>Affiliate Portal</span>
        </Link>
        
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>Commissions</span>
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Referrals</span>
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="hidden text-sm md:block">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">Affiliate</div>
            </div>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatar.png" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          
          <Link href="/login">
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Affiliate Dashboard</h1>
          <p className="text-muted-foreground">
            Track your referrals and commissions
          </p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>
              Share this link to earn commissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  value="https://example.com/ref/abc123" 
                  readOnly 
                  className="pl-8"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={copyReferralLink} className="flex items-center gap-1">
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Referrals
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referrals.length}</div>
              <div className="mt-1 flex items-center text-xs text-green-500">
                <ChevronUp className="h-3 w-3" />
                <span>+2 this month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Referrals
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {referrals.filter(r => r.status === "Active").length}
              </div>
              <div className="mt-1 flex items-center text-xs text-green-500">
                <ChevronUp className="h-3 w-3" />
                <span>+1 this month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${commissions.reduce((acc, com) => acc + com.amount, 0).toFixed(2)}
              </div>
              <div className="mt-1 flex items-center text-xs text-green-500">
                <ChevronUp className="h-3 w-3" />
                <span>+$71.49 this month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5%</div>
              <div className="mt-1 flex items-center text-xs text-red-500">
                <ChevronDown className="h-3 w-3" />
                <span>-2.3% this month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>
                Monthly earnings and referrals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="commissions" name="Commissions ($)" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="referrals" name="Referrals" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Referral Status</CardTitle>
              <CardDescription>
                Status breakdown of your referrals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Referrals']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue="referrals">
            <TabsList>
              <TabsTrigger value="referrals" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Referrals</span>
              </TabsTrigger>
              <TabsTrigger value="commissions" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>Commissions</span>
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex items-center gap-1">
                <Link2 className="h-4 w-4" />
                <span>Marketing Materials</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="referrals">
              <Card>
                <CardHeader>
                  <CardTitle>Your Referrals</CardTitle>
                  <CardDescription>
                    All clients you have referred
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    columns={referralColumns} 
                    data={referrals} 
                    searchKey="name" 
                    searchPlaceholder="Search referrals..." 
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="commissions">
              <Card>
                <CardHeader>
                  <CardTitle>Commission History</CardTitle>
                  <CardDescription>
                    Earnings from your referrals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    columns={commissionColumns} 
                    data={commissions} 
                    searchKey="id" 
                    searchPlaceholder="Search commissions..." 
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="materials">
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Materials</CardTitle>
                  <CardDescription>
                    Resources to help promote your referral link
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Social Media Banner</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                          <span className="text-sm text-muted-foreground">Banner Preview</span>
                        </div>
                        <Button size="sm" className="mt-4 w-full">Download</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Email Template</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                          <span className="text-sm text-muted-foreground">Email Preview</span>
                        </div>
                        <Button size="sm" className="mt-4 w-full">Copy Template</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Product Graphics</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                          <span className="text-sm text-muted-foreground">Graphics Preview</span>
                        </div>
                        <Button size="sm" className="mt-4 w-full">Download Pack</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}