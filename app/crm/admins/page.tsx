"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { Eye, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, generateAdmins } from "@/lib/data-utils";

const admins = generateAdmins(15);

export default function AdminsPage() {
  const router = useRouter();

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
      cell: ({ row }) => {
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
            <span>{role}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) => {
        return formatDate(row.getValue("lastLogin"));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const admin = row.original;
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/crm/admins/history/${admin.id}`)}
            className="flex items-center gap-1"
          >
            <Eye className="h-4 w-4" />
            <span>History</span>
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
          <DataTable columns={columns} data={admins} searchKey="name" searchPlaceholder="Search administrators..." />
        </CardContent>
      </Card>
    </div>
  );
}