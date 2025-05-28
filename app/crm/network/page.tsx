"use client";

import { useCallback, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus, Users } from "lucide-react";
import { generateClients } from "@/lib/data-utils";

// Generate referral data
const clients = generateClients(50);

// Create a map of random referral relationships
const referralMap = new Map();

// Create a simple tree structure starting with "root" clients
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
  const referredClients = referredIds.map((id: string) => clients.find(c => c.id === id));
  const commissions = Math.floor(Math.random() * 5000);
  
  return {
    ...client,
    referredClients,
    totalReferrals: referredClients.length,
    commissions,
    status: commissions > 3000 ? "Very Active" : commissions > 1000 ? "Active" : "Inactive",
  };
});

interface NetworkNodeProps {
  client: any;
  level?: number;
  isLast?: boolean;
}

const NetworkNode = ({ client, level = 0, isLast = false }: NetworkNodeProps) => {
  const [expanded, setExpanded] = useState(level === 0);
  const referredClients = client.referredClients || [];
  
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
  
  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);
  
  const initials = client.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();
  
  return (
    <div className="network-node pl-6">
      <div 
        className={`
          relative flex items-center mb-2 p-2 rounded-md border
          ${expanded ? "bg-secondary" : "bg-card"}
          hover:bg-secondary transition-colors
          ${level === 0 ? "ml-0" : ""}
        `}
      >
        {level > 0 && (
          <div className="absolute left-0 top-1/2 w-6 -translate-x-full border-t border-gray-300" />
        )}
        
        {level > 0 && !isLast && (
          <div className="absolute left-0 top-1/2 h-full -translate-x-full border-l border-gray-300" />
        )}
        
        <div className="flex items-center flex-1">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">{client.name}</div>
            <div className="text-xs text-muted-foreground">{client.email}</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
            {client.commissions > 0 && (
              <span className="text-sm font-medium">${client.commissions}</span>
            )}
            {referredClients.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0" 
                onClick={toggleExpanded}
              >
                {expanded ? "−" : "+"}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {expanded && referredClients.length > 0 && (
        <div className="pl-4">
          {referredClients.map((referredClient: any, index: number) => (
            <NetworkNode 
              key={referredClient.id} 
              client={referredClient} 
              level={level + 1}
              isLast={index === referredClients.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function NetworkPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredClients = rootClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalReferrals = relationshipData.reduce(
    (acc, client) => acc + client.totalReferrals,
    0
  );
  
  const totalCommissions = relationshipData.reduce(
    (acc, client) => acc + client.commissions,
    0
  );
  
  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Referral Network</h1>
          <p className="text-muted-foreground">
            Explore the referral relationships between clients
          </p>
        </div>
        <Button className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          <span>Add Relationship</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Referrals
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReferrals}</div>
            <p className="text-xs text-muted-foreground">
              Active referral relationships
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sponsors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralMap.size}</div>
            <p className="text-xs text-muted-foreground">
              Clients with referrals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Commissions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Earned through referrals
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Referral Tree</CardTitle>
          <CardDescription>
            Visualize the sponsor-affiliate relationships
          </CardDescription>
          <div className="mt-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-h-[800px] overflow-auto">
          <div className="network-tree">
            {filteredClients.map((client, index) => {
              const enrichedClient = relationshipData.find(c => c.id === client.id);
              return (
                <NetworkNode
                  key={client.id}
                  client={enrichedClient}
                  isLast={index === filteredClients.length - 1}
                />
              );
            })}
          </div>
          
          {filteredClients.length === 0 && (
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">No clients found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}