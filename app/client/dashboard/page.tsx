"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Package, Clock, CreditCard, Star, Award, Mail, LogOut, Home, ChevronRight, Download, Eye } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import { formatDate } from "@/lib/data-utils";

// Sample data
const orders = [
  {
    id: "ORD-001",
    date: new Date(2025, 3, 15).toISOString(),
    total: 125.99,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD-002",
    date: new Date(2025, 3, 10).toISOString(),
    total: 79.50,
    status: "Shipped",
    items: 2,
  },
  {
    id: "ORD-003",
    date: new Date(2025, 3, 5).toISOString(),
    total: 245.00,
    status: "Processing",
    items: 5,
  },
  {
    id: "ORD-004",
    date: new Date(2025, 2, 28).toISOString(),
    total: 54.25,
    status: "Delivered",
    items: 1,
  },
  {
    id: "ORD-005",
    date: new Date(2025, 2, 20).toISOString(),
    total: 189.99,
    status: "Delivered",
    items: 4,
  },
];

const returns = [
  {
    id: "RTN-001",
    date: new Date(2025, 3, 2).toISOString(),
    amount: 79.99,
    status: "Approved",
    reason: "Wrong size",
  },
  {
    id: "RTN-002",
    date: new Date(2025, 2, 15).toISOString(),
    amount: 45.50,
    status: "Processing",
    reason: "Damaged item",
  },
];

export default function ClientDashboardPage() {
  const orderColumns = [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return formatDate(row.getValue("date"));
      },
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => {
        const items = row.getValue("items") as number;
        return (
          <div className="flex items-center gap-1">
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            <span>{items}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        const total = row.getValue("total") as number;
        return (
          <div className="font-medium">
            ${total.toFixed(2)}
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
          case "Delivered":
            color = "bg-green-500";
            break;
          case "Shipped":
            color = "bg-blue-500";
            break;
          case "Processing":
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
            <Eye className="h-4 w-4" />
            <span>View</span>
          </Button>
        );
      },
    },
  ];
  
  const returnColumns = [
    {
      accessorKey: "id",
      header: "Return ID",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return formatDate(row.getValue("date"));
      },
    },
    {
      accessorKey: "reason",
      header: "Reason",
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
          case "Approved":
            color = "bg-green-500";
            break;
          case "Processing":
            color = "bg-amber-500";
            break;
          case "Rejected":
            color = "bg-red-500";
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
            <Eye className="h-4 w-4" />
            <span>View</span>
          </Button>
        );
      },
    },
  ];
  
  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-5 w-5" />
          <span>Client Portal</span>
        </Link>
        
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>Messages</span>
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" />
            <span>Orders</span>
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="hidden text-sm md:block">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">Customer</div>
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
          <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your orders, returns, and loyalty rewards
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                Since account creation
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Returns
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                In progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Loyalty Points
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">750</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+150</span> this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Membership Status
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Silver</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Silver</span>
                  <span>Gold</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  250 more points to Gold tier
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent orders and returns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="orders">
                <TabsList className="mb-4">
                  <TabsTrigger value="orders" className="flex items-center gap-1">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Orders</span>
                  </TabsTrigger>
                  <TabsTrigger value="returns" className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    <span>Returns</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="orders">
                  <DataTable 
                    columns={orderColumns} 
                    data={orders} 
                    searchKey="id" 
                    searchPlaceholder="Search orders..." 
                  />
                </TabsContent>
                
                <TabsContent value="returns">
                  <DataTable 
                    columns={returnColumns} 
                    data={returns} 
                    searchKey="id" 
                    searchPlaceholder="Search returns..." 
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loyalty Progress</CardTitle>
                <CardDescription>
                  Your membership benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gray-400">Silver</Badge>
                        <span className="font-medium text-sm">Current Tier</span>
                      </div>
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Benefits:</div>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-center gap-1">
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          <span>Free shipping on orders over $50</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          <span>10% discount on selected items</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          <span>Birthday rewards</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-500">Gold</Badge>
                        <span className="font-medium text-sm">Next Tier</span>
                      </div>
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      750 / 1000 points
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Additional Benefits:</div>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-center gap-1">
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          <span>Free shipping on all orders</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          <span>20% discount on selected items</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          <span>Exclusive early access</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>View All Benefits</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common client tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Package className="h-4 w-4" />
                    <span>Request Return</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    <span>Download Invoices</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Manage Payment Methods</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Clock className="h-4 w-4" />
                    <span>View Order History</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}