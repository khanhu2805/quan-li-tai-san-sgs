"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Menu,
  X,
  Home,
  Package,
  Users,
  FileText,
  Settings,
  LogOut,
  Building2,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"

const barData = [
  { name: "Trường THPT A", value: 120 },
  { name: "Trường THCS B", value: 85 },
  { name: "Trường Tiểu học C", value: 95 },
  { name: "Trường THPT D", value: 110 },
  { name: "Trường THCS E", value: 75 },
]

const pieData = [
  { name: "Đang sử dụng", value: 485, color: "hsl(var(--chart-1))" },
  { name: "Sẵn sàng", value: 125, color: "hsl(var(--chart-2))" },
  { name: "Cần sửa chữa", value: 45, color: "hsl(var(--chart-3))" },
]

const recentActivities = [
  { action: "Bàn giao", asset: "Máy tính Dell Latitude", user: "Nguyễn Văn A", time: "2 giờ trước" },
  { action: "Thu hồi", asset: "Máy chiếu Epson", user: "Trần Thị B", time: "4 giờ trước" },
  { action: "Bàn giao", asset: "Bàn làm việc", user: "Lê Văn C", time: "6 giờ trước" },
  { action: "Sửa chữa", asset: "Máy in Canon", user: "Phạm Thị D", time: "1 ngày trước" },
  { action: "Thu hồi", asset: "Ghế xoay", user: "Hoàng Văn E", time: "1 ngày trước" },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: "Bảng điều khiển", icon: Home, active: true },
    { name: "Quản lý Tài sản", icon: Package, active: false },
    { name: "Quản lý Đối tượng", icon: Users, active: false },
    { name: "Báo cáo & Biên bản", icon: FileText, active: false },
    { name: "Cài đặt", icon: Settings, active: false },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo section */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-sidebar-accent-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">AssetPro</h1>
                <p className="text-xs text-sidebar-foreground/70">Quản lý tài sản</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start text-left ${
                  item.active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-sidebar-accent-foreground">NA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Nguyễn Văn Admin</p>
                <p className="text-xs text-sidebar-foreground/70">Quản trị viên</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" size="sm" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div className="inline-block">
                <h1 className="text-2xl font-bold text-foreground text-balance">
                  Chào mừng trở lại, Nguyễn Văn Admin!
                </h1>
                <p className="text-muted-foreground mt-1">Tổng quan về tình trạng tài sản và hoạt động gần đây</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 lg:p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng số tài sản</CardTitle>
                <Package className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+12% từ tháng trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đang sử dụng</CardTitle>
                <CheckCircle className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">985</div>
                <p className="text-xs text-muted-foreground">79% tổng số tài sản</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sẵn sàng</CardTitle>
                <Clock className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">217</div>
                <p className="text-xs text-muted-foreground">17% tổng số tài sản</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cần sửa chữa</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">4% tổng số tài sản</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Phân bổ Tài sản theo Trường học</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie chart */}
            <Card>
              <CardHeader>
                <CardTitle>Tài sản theo Trạng thái</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                        <span>{entry.name}</span>
                      </div>
                      <span className="font-medium">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent activities */}
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động Gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-medium">Hành động</th>
                      <th className="text-left py-2 px-4 font-medium">Tài sản</th>
                      <th className="text-left py-2 px-4 font-medium">Người thực hiện</th>
                      <th className="text-left py-2 px-4 font-medium">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((activity, index) => (
                      <tr key={index} className="border-b last:border-b-0 hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              activity.action === "Bàn giao"
                                ? "default"
                                : activity.action === "Thu hồi"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {activity.action}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-medium">{activity.asset}</td>
                        <td className="py-3 px-4">{activity.user}</td>
                        <td className="py-3 px-4 text-muted-foreground">{activity.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
