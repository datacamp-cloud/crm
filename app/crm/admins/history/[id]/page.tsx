"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, LogIn, Settings, UserCog } from "lucide-react";
import { cn, formatDate, generateAdmins } from "@/lib/data-utils";
import { Badge } from "@/components/ui/badge";

const admins = generateAdmins(15);

// Generate random admin history
function generateAdminHistory(adminId: string, count = 20) {
  const actions = [
    { type: "login", description: "User logged in" },
    { type: "logout", description: "User logged out" },
    { type: "update", description: "Updated client information" },
    { type: "settings", description: "Changed system settings" },
    { type: "create", description: "Created new client" },
    { type: "delete", description: "Deleted client record" },
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `history-${i}`,
    adminId,
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    action: actions[Math.floor(Math.random() * actions.length)].type,
    description: actions[Math.floor(Math.random() * actions.length)].description,
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function AdminHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (params.id) {
      const foundAdmin = admins.find((a) => a.id === params.id);
      if (foundAdmin) {
        setAdmin(foundAdmin);
        setHistory(generateAdminHistory(foundAdmin.id));
      }
    }
  }, [params.id]);

  if (!admin) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "login":
        return <LogIn className="h-4 w-4" />;
      case "logout":
        return <LogIn className="h-4 w-4 rotate-180" />;
      case "settings":
        return <Settings className="h-4 w-4" />;
      default:
        return <UserCog className="h-4 w-4" />;
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
        Back to Administrators
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{admin.name}</h1>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-muted-foreground">{admin.email}</p>
          <Badge>{admin.role}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <CardDescription>
            Showing all activities and logins for this administrator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 h-full w-px bg-border" />
            
            {history.map((item, index) => (
              <div key={item.id} className="mb-8 last:mb-0">
                <div
                  className={cn(
                    "absolute left-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border bg-background"
                  )}
                  style={{ top: index * 32 + 4 }}
                >
                  {getActionIcon(item.action)}
                </div>
                <div className="flex flex-col space-y-1 pb-4">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.description}</p>
                    <Badge variant="outline" className="ml-auto">
                      {item.action}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(item.date)}</span>
                    <span className="text-xs">IP: {item.ip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}