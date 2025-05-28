"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { Plus, Users } from "lucide-react";
import { generateSegments, formatDate } from "@/lib/data-utils";
import { Badge } from "@/components/ui/badge";

const segments = generateSegments(12);

export default function SegmentsPage() {
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "criteria",
      header: "Criteria",
      cell: ({ row }) => {
        const criteria = row.getValue("criteria") as string;
        return (
          <Badge variant="outline">{criteria}</Badge>
        );
      },
    },
    {
      accessorKey: "count",
      header: "Clients",
      cell: ({ row }) => {
        const count = row.getValue("count") as number;
        return (
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{count}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        return formatDate(row.getValue("createdAt"));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const segment = row.original;
        return (
          <Button variant="ghost" size="sm">
            View
          </Button>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Segments</h1>
          <p className="text-muted-foreground">
            Manage client segments for targeted marketing
          </p>
        </div>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Create Segment</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Segments
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{segments.length}</div>
            <p className="text-xs text-muted-foreground">
              Active client segments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Segmented Clients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {segments.reduce((acc, segment) => acc + segment.count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Clients in segments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Size
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                segments.reduce((acc, segment) => acc + segment.count, 0) /
                  segments.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Clients per segment
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Segment List</CardTitle>
          <CardDescription>
            Manage all client segments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={segments} searchKey="name" searchPlaceholder="Search segments..." />
        </CardContent>
      </Card>
    </div>
  );
}