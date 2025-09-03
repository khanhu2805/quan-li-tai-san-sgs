"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Asset, statuses, assetTypes } from "./data"
import Link from "next/link"

// Định nghĩa các cột cho bảng
export const columns: ColumnDef<Asset>[] = [
  // Cột checkbox để chọn hàng
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Chọn tất cả"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Chọn hàng"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Cột Mã tài sản
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <Link href={`/assets/${row.getValue("id")}`} className="hover:underline">{row.getValue("id")}</Link>
  },
  // Cột Tên tài sản
  {
    accessorKey: "name",
    header: "Tên tài sản",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>
  },
  // Cột Loại
  {
    accessorKey: "type",
    header: "Loại",
    cell: ({ row }) => {
      const type = assetTypes.find(
        (type) => type.value === row.getValue("type")
      )
      if (!type) return null
      const Icon = type.icon
      return (
        <div className="flex items-center">
          <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{type.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // Cột Trạng thái
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )
      if (!status) return null
      return <Badge variant={
        status.value === "Mất" ? "destructive" :
        status.value === "Đang sửa chữa" ? "secondary" : "outline"
      }>{status.label}</Badge>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // Cột Nơi giữ
  {
    accessorKey: "location",
    header: "Nơi giữ",
  },
  // Cột Người phụ trách
  {
    accessorKey: "assignee",
    header: "Người phụ trách",
  },
  // Cột Hành động
  {
    id: "actions",
    cell: ({ row }) => {
      const asset = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(asset.id)}
            >
              Sao chép mã
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/assets/${asset.id}`}>
              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Cập nhật trạng thái</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Xóa tài sản
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]