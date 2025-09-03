"use client"

import * as React from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { assetTypes } from "../data"
import Link from "next/link"

export default function NewAssetPage() {
  const [assetType, setAssetType] = React.useState<string | undefined>(undefined);

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
                Thêm tài sản mới
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                 <Link href="/assets">
                    <Button variant="outline" size="sm">
                        Hủy
                    </Button>
                </Link>
                <Button size="sm">Lưu</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Chi tiết tài sản</CardTitle>
                    <CardDescription>
                      Nhập các thông tin chi tiết cho tài sản mới.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Tên tài sản</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          placeholder="ví dụ: iPad Pro 11-inch"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="grid gap-3">
                            <Label htmlFor="id">Mã tài sản</Label>
                            <Input id="id" type="text" placeholder="ASSET-008" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="serial">Số sê-ri</Label>
                            <Input id="serial" type="text" placeholder="SN-..." />
                        </div>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Mô tả</Label>
                        <Textarea
                          id="description"
                          placeholder="Mô tả ngắn về tình trạng, cấu hình..."
                          className="min-h-32"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Phân loại</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="type">Loại tài sản</Label>
                        <Select onValueChange={setAssetType}>
                          <SelectTrigger id="type" aria-label="Chọn loại">
                            <SelectValue placeholder="Chọn loại tài sản" />
                          </SelectTrigger>
                          <SelectContent>
                            {assetTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                 {assetType === 'Robot Kit' && (
                  <Card>
                    <CardHeader>
                        <CardTitle>Mẫu Kit</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="grid gap-3">
                            <Label htmlFor="template">Chọn mẫu kit</Label>
                            <Select>
                            <SelectTrigger id="template" aria-label="Chọn mẫu">
                                <SelectValue placeholder="Chọn mẫu kit..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="vex-go">VEX GO Kit</SelectItem>
                                <SelectItem value="spike-prime">LEGO SPIKE Prime</SelectItem>
                                <SelectItem value="mbot-neo">mBot Neo</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
             <div className="flex items-center justify-center gap-2 md:hidden">
                <Link href="/assets">
                    <Button variant="outline" size="sm">
                        Hủy
                    </Button>
                </Link>
              <Button size="sm">Lưu</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}