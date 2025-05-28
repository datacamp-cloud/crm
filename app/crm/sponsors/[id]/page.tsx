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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ChevronRight, DollarSign, Users, Clock, Bell } from "lucide-react";
import { generateClients } from "@/lib/data-utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import { DataTable } from "@/components/data-table/data-table";

// Sample data
const clients = generateClients(50);

// Create a map of random referral relationships
const referralMap = new Map();

// Create a simple tree structure
const rootClients = clients.slice(0, 5);
let remainingClients = clients.slice(5);

// Assign first-level referrals
rootClients.forEach(client => {
  const referrals = remainingClients.splice(0, Math.floor(Math.random() * 3) + 1);
  referralMap.set(client.id, referrals.map(r => r.id));
  
  // Second level referrals
  referrals.forEach(referral => {
    const subReferrals = remainingClients.splice(0, Math.floor(Math.random() * 2) + 0);
    if (subReferrals.length > 0) {
      referralMap.set(referral.id, subReferrals.map(r => r.id));
    }
  });
});

// Create relationship data for display
const relationshipData = clients.map(client => {
  const referredIds = referralMap.get(client.id) || [];
  const referredClients = referredIds.map(id => clients.find(c => c.id === id));
  const commissions = Math.floor(Math.random() * 5000);
  
  return {
    ...client,
    referredClients,
    totalReferrals: referredClients.length,
    commissions,
    status: commissions > 3000 ? "Very Active" : commissions > 1000 ? "Active" : "Inactive",
  };
});

// Generate commission data
const generateCommissionData = () => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2025, i, 1).toLocaleString('default', { month: 'short' });
    return {
      month,
      amount: Math.floor(Math.random() * 1500) + 500,
    };
  });
};

// Generate referral status data
const generateReferralStatusData = (referralCount: number) => {
  const active = Math.floor(referralCount * 0.6);
  const inactive = referralCount - active;
  
  return [
    { name: 'Active', value: active },
    { name: 'Inactive', value: inactive },
  ];
};

const COLORS = ['#4CAF50', '#F44336'];

export default function SponsorPage() {
  const params = useParams();
  const router = useRouter();
  const [sponsor, setSponsor] = useState<any>(null);
  const [commissionData, setCommissionData] = useState<any[]>([]);
  const [referralStatusData, setReferralStatusData] = useState<any[]>([]);
  
  useEffect(() => {
    if (params.id) {
      const foundSponsor = relationshipData.find((s) => s.id === params.id);
      if (foundSponsor) {
        setSponsor(foundSponsor);
        setCommissionData(generateCommissionData());
        setReferralStatusData(generateReferralStatusData(foundSponsor.totalReferrals));
      }
    }
  }, [params.id]);
  
  if (!sponsor) {
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
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Very Active":
        return "bg-green-500";
      case "Active":
        return "bg-blue-500";
      case "Inactive":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const referralColumns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const affiliate = row.original;
        const initials = getInitials(affiliate.name);
        
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span>{affiliate.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status || "Inactive";
        return (
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "commissions",
      header: "Commissions",
      cell: ({ row }) => {
        const affiliate = row.original;
        const commissions = affiliate.commissions || 0;
        
        return (
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>{commissions.toLocaleString()}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <span>View</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];
  
  return (
    <div className="p-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push("/crm/network")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Network
      </Button>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">{getInitials(sponsor.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{sponsor.name}</h1>
              <Badge className={getStatusColor(sponsor.status)}>{sponsor.status}</Badge>
            </div>
            <p className="text-muted-foreground">Sponsor Dashboard</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Affiliates
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsor.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">
              Referred clients
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Commissions
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${sponsor.commissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Lifetime earnings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Commission
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${sponsor.totalReferrals > 0 
                ? Math.round(sponsor.commissions / sponsor.totalReferrals).toLocaleString() 
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Per affiliate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inactivity Alerts
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {Math.round(sponsor.totalReferrals * 0.4)}
            </div>
            <p className="text-xs text-muted-foreground">
              Inactive affiliates
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Commission History</CardTitle>
            <CardDescription>
              Monthly commission earnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={commissionData}
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
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Affiliate Status</CardTitle>
            <CardDescription>
              Active vs. Inactive affiliates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={referralStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {referralStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Affiliates']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Affiliates</CardTitle>
          <CardDescription>
            List of all referred clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={referralColumns} 
            data={sponsor.referredClients} 
            searchKey="name" 
            searchPlaceholder="Search affiliates..."
          />
        </CardContent>
      </Card>
    </div>
  );
}