import { ChevronLeft, MoreVertical, File, ListFilter } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { assets, statuses } from "../data"
import Link from "next/link"


export default function AssetDetailPage({ params }: { params: { id: string }}) {
  const asset = assets.find(a => a.id === params.id)
  const status = statuses.find(s => s.value === asset?.status)

  if (!asset || !status) {
    return <div>Không tìm thấy tài sản</div>
  }

  const Icon = status.icon;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
               <Link href="/assets">
                 <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Quay lại</span>
                </Button>
               </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {asset.name}
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                {asset.status}
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  Hủy
                </Button>
                <Button size="sm">Lưu</Button>
              </div>
            </div>
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="info">Thông tin chung</TabsTrigger>
                <TabsTrigger value="history">Lịch sử bàn giao</TabsTrigger>
                <TabsTrigger value="maintenance">Bảo trì</TabsTrigger>
                {asset.type === 'Rio Kit' && <TabsTrigger value="components">Linh kiện</TabsTrigger>}
              </TabsList>
              <TabsContent value="info">
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Thông tin chi tiết</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-medium text-foreground">Mã tài sản</p>
                                        <p>{asset.id}</p>
                                    </div>
                                     {/* <div>
                                        <p className="font-medium text-foreground">Số sê-ri</p>
                                        <p>{asset.serial}</p>
                                    </div> */}
                                     <div>
                                        <p className="font-medium text-foreground">Loại</p>
                                        <p>{asset.type}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Ngày mua</p>
                                        <p>12/08/2023</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle>Trạng thái</CardTitle>
                                <Icon className={`h-4 w-4 ${status.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{asset.status}</div>
                                <p className="text-xs text-muted-foreground">
                                   Cập nhật lần cuối: 2 giờ trước
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Cập nhật trạng thái</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
              </TabsContent>
               <TabsContent value="history">
                  <Card>
                    <CardHeader>
                        <CardTitle>Lịch sử Bàn giao / Thu hồi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ngày</TableHead>
                                    <TableHead>Hành động</TableHead>
                                    <TableHead>Người nhận / trả</TableHead>
                                    <TableHead>Địa điểm</TableHead>
                                    <TableHead>Tình trạng</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>01/08/2024</TableCell>
                                    <TableCell><Badge>Bàn giao</Badge></TableCell>
                                    <TableCell>Cô Nguyễn Thị Lan</TableCell>
                                    <TableCell>Trường THPT Chuyên Trần Đại Nghĩa</TableCell>
                                     <TableCell>Tốt</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>15/07/2024</TableCell>
                                    <TableCell><Badge variant="secondary">Thu hồi</Badge></TableCell>
                                    <TableCell>Anh Trần Văn Hùng</TableCell>
                                    <TableCell>Kho SGS Trung tâm</TableCell>
                                    <TableCell>Tốt</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}