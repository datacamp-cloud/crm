"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { Eye, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, generateAdmins } from "@/lib/data-utils";
import { Badge } from "@/components/ui/badge";

const admins = generateAdmins(15);

export default function AdminsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");


  // Filtrer les admins en fonction des critères
  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || admin.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  type Admin = {
    id: string;
    name: string;
    email: string;
    role: string;
    lastLogin: string | Date;
  };


  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
        const role = row.getValue("role") as string;
        return (
          <div className="flex items-center">
            <span
              className={`mr-2 h-2 w-2 rounded-full ${
                role === "Super Admin"
                  ? "bg-red-500"
                  : role === "Admin"
                  ? "bg-blue-500"
                  : role === "Editor"
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            />
            <Badge 
              variant="outline" 
              className={`${
                role === "Super Admin" ? "border-red-500/20 text-red-600 bg-red-500/10" :
                role === "Admin" ? "border-blue-500/20 text-blue-600 bg-blue-500/10" :
                role === "Editeur" ? "border-green-500/20 text-green-600 bg-green-500/10" :
                "border-gray-500/20 text-gray-600 bg-gray-500/10"
              }`}
            >
              {role}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
        return formatDate(row.getValue("lastLogin"));
      },
    },
    {
      id: "actions",
      cell: ({ row }: { row: {original: any, getValue: (key: string) => string } }) => {
        const admin = row.original;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/crm/admins/history/${admin.id}`)}
            className="border-blue-500/20 hover:bg-blue-500/10 text-blue-600"
          >
            {/* <Eye className="h-4 w-4" /> */}
            <span className="text-blue-600">Voir Activité</span>
          </Button>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Administrators</h1>
          <p className="text-muted-foreground">
            Manage system administrators and their permissions
          </p>
        </div>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Add Administrator</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Administrator List</CardTitle>
          <CardDescription>
            View and manage all system administrators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
              columns={columns} 
              data={admins}
              searchKey="name" 
              searchPlaceholder="Search administrators..." 
          />
        </CardContent>
      </Card>
    </div>
  );
}