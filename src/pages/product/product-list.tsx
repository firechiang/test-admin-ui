import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";

import {DataTablePagination} from "@/components/data-table-pagination";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-table-column-header";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import React from "react";

interface Task {
    id: string,
    title: string,
    status: string,
    label: string,
    priority: string,
}

const data: Task[] = [
    {
        "id": "TASK-8782",
        "title": "You can't compress the program without quantifying the open-source SSD pixel!",
        "status": "in progress",
        "label": "documentation",
        "priority": "medium"
    },
    {
        "id": "TASK-7878",
        "title": "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
        "status": "backlog",
        "label": "documentation",
        "priority": "medium"
    },
    {
        "id": "TASK-7839",
        "title": "We need to bypass the neural TCP card!",
        "status": "todo",
        "label": "bug",
        "priority": "high"
    },
    {
        "id": "TASK-5562",
        "title": "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
        "status": "backlog",
        "label": "feature",
        "priority": "medium"
    },
    {
        "id": "TASK-8686",
        "title": "I'll parse the wireless SSL protocol, that should driver the API panel!",
        "status": "canceled",
        "label": "feature",
        "priority": "medium"
    },
    {
        "id": "TASK-1280",
        "title": "Use the digital TLS panel, then you can transmit the haptic system!",
        "status": "done",
        "label": "bug",
        "priority": "high"
    },
    {
        "id": "TASK-7262",
        "title": "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
        "status": "done",
        "label": "feature",
        "priority": "high"
    },
    {
        "id": "TASK-1138",
        "title": "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
        "status": "in progress",
        "label": "feature",
        "priority": "medium"
    },
    {
        "id": "TASK-7184",
        "title": "We need to program the back-end THX pixel!",
        "status": "todo",
        "label": "feature",
        "priority": "low"
    },
    {
        "id": "TASK-5160",
        "title": "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
        "status": "in progress",
        "label": "documentation",
        "priority": "high"
    },
    {
        "id": "TASK-5618",
        "title": "Generating the driver won't do anything, we need to index the online SSL application!",
        "status": "done",
        "label": "documentation",
        "priority": "medium"
    },
    {
        "id": "TASK-6699",
        "title": "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!",
        "status": "backlog",
        "label": "documentation",
        "priority": "medium"
    },
    {
        "id": "TASK-2858",
        "title": "We need to override the online UDP bus!",
        "status": "backlog",
        "label": "bug",
        "priority": "medium"
    },
    {
        "id": "TASK-9864",
        "title": "I'll reboot the 1080p FTP panel, that should matrix the HEX hard drive!",
        "status": "done",
        "label": "bug",
        "priority": "high"
    }
];

const columns: ColumnDef<Task>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Task"/>
        ),
        cell: ({row}) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Title"/>
        ),
        cell: ({row}) => {
            return (
                <div className="flex gap-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Status"/>
        ),
        cell: ({row}) => {
            return (
                <div className="flex w-[100px] items-center gap-2">
                    <span>{row.getValue("status")}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "priority",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Priority"/>
        ),
        cell: ({row}) => {
            return (
                <div className="flex items-center gap-2">
                    <span>{row.getValue("priority")}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="data-[state=open]:bg-muted size-8">
                            <MoreHorizontal/>
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Make a copy</DropdownMenuItem>
                        <DropdownMenuItem>Favorite</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => alert(row.id)}>
                            Delete
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]

export default function ProductList() {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable<Task>({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (

        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center gap-2">
                    <Input
                        placeholder="Filter tasks..."
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm">Add Task</Button>
                </div>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table}/>
        </div>
    )
}