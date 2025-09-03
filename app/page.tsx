"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Tablet,
  Bot,
  PackagePlus,
  Boxes,
} from "lucide-react"

// --- CẤU TRÚC VÀ DỮ LIỆU MẪU MỚI ---

// Định nghĩa các loại tài sản
const ASSET_TYPES = {
  ALL: "Tất cả tài sản",
  IPAD: "iPad",
  STEM_KIT: "Bộ STEM Starter Kit",
  RIO_SET: "Bộ Rio",
  ROVER_SET: "Bộ Rover",
}

// Dữ liệu tổng hợp toàn bộ tài sản trong kho
const allAssets = [
  // iPads
  { id: "ipad-001", name: "iPad Gen 9 #01", type: ASSET_TYPES.IPAD, status: "Đang sử dụng", school: "Trường THPT A" },
  { id: "ipad-002", name: "iPad Pro M1 #01", type: ASSET_TYPES.IPAD, status: "Sẵn sàng", school: "Trường THCS B" },
  { id: "ipad-003", name: "iPad Air 5 #01", type: ASSET_TYPES.IPAD, status: "Đang sử dụng", school: "Trường THPT A" },
  
  // STEM Kits
  { id: "stem-001", name: "Bộ STEM Kit #01", type: ASSET_TYPES.STEM_KIT, status: "Đang sử dụng", school: "Trường THCS E" },
  { id: "stem-002", name: "Bộ STEM Kit #02", type: ASSET_TYPES.STEM_KIT, status: "Sẵn sàng", school: "Trường THPT D" },
];

// Dữ liệu hoạt động gần đây
const recentActivities = [
  { action: "Bàn giao", asset: "Bộ Rio #01", type: ASSET_TYPES.RIO_SET, user: "Nguyễn Văn A", time: "2 giờ trước" },
  { action: "Thu hồi", asset: "iPad Gen 9 #02", type: ASSET_TYPES.IPAD, user: "Trần Thị B", time: "4 giờ trước" },
  { action: "Bàn giao", asset: "Bộ Rover #01", type: ASSET_TYPES.ROVER_SET, user: "Lê Văn C", time: "6 giờ trước" },
  { action: "Thu hồi", asset: "Bộ STEM Kit #01", type: ASSET_TYPES.STEM_KIT, user: "Phạm Thị D", time: "12 giờ trước" },
  { action: "Bàn giao", asset: "iPad Pro M1 #01", type: ASSET_TYPES.IPAD, user: "Hoàng Văn E", time: "1 ngày trước" },
];

// Màu cho biểu đồ tròn
const PIE_CHART_COLORS = {
  "Đang sử dụng": "hsl(var(--chart-1))",
  "Sẵn sàng": "hsl(var(--chart-2))",
  "Cần sửa chữa": "hsl(var(--chart-3))",
}

// --- COMPONENT CHÍNH ---

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedAssetType, setSelectedAssetType] = useState(ASSET_TYPES.ALL)

  // Dùng useMemo để tự động tính toán lại dữ liệu khi lựa chọn thay đổi
  const filteredData = useMemo(() => {
    let filteredAssets = allAssets;
    if (selectedAssetType !== ASSET_TYPES.ALL) {
      // if (selectedAssetType === ASSET_TYPES.RIO_SET || selectedAssetType === ASSET_TYPES.ROVER_SET) {
      //   // Lọc theo bộ
      //   filteredAssets = allAssets.filter(asset => asset.type === selectedAssetType);
      // } else {
      //   // Lọc theo loại sản phẩm đơn lẻ
      filteredAssets = allAssets.filter(asset => asset.type === selectedAssetType);
      // }
    }

    // Tính toán dữ liệu cho biểu đồ cột (số lượng tài sản mỗi trường)
    const schoolCounts = filteredAssets.reduce((acc, asset) => {
      acc[asset.school] = (acc[asset.school] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const barData = Object.keys(schoolCounts).map(school => ({ name: school, value: schoolCounts[school] }));

    // Tính toán dữ liệu cho biểu đồ tròn (phân bổ theo trạng thái)
    const statusCounts = filteredAssets.reduce((acc, asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const pieData = Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status],
      color: PIE_CHART_COLORS[status as keyof typeof PIE_CHART_COLORS],
    }));
    
    // Lọc hoạt động gần đây
    const filteredActivities = (selectedAssetType === ASSET_TYPES.ALL)
      ? recentActivities
      : recentActivities.filter(activity => activity.type === selectedAssetType);

    return { filteredAssets, barData, pieData, filteredActivities };
  }, [selectedAssetType])

  const navigation = [
    { name: "Bảng điều khiển", icon: Home, active: true },
    { name: "Quản lý Tài sản", icon: Package, active: false },
    { name: "Quản lý Đối tượng", icon: Users, active: false },
    { name: "Báo cáo & Biên bản", icon: FileText, active: false },
    { name: "Cài đặt", icon: Settings, active: false },
  ]
  
  const kpiStats = {
      total: allAssets.length,
      inUse: allAssets.filter(a => a.status === "Đang sử dụng").length,
      available: allAssets.filter(a => a.status === "Sẵn sàng").length,
      needsFix: allAssets.filter(a => a.status === "Cần sửa chữa").length
  };

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
                <div className="flex items-center space-x-3"><div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center"><Building2 className="w-5 h-5 text-sidebar-accent-foreground" /></div><div><h1 className="text-lg font-semibold text-sidebar-foreground">AssetPro</h1><p className="text-xs text-sidebar-foreground/70">Quản lý tài sản</p></div></div>
                <Button variant="ghost" size="sm" className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></Button>
            </div>
            <nav className="flex-1 p-4 space-y-2">{navigation.map(item => (<Button key={item.name} variant={item.active ? "default" : "ghost"} className={`w-full justify-start text-left ${item.active ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}><item.icon className="w-5 h-5 mr-3" />{item.name}</Button>))}</nav>
            <div className="p-4 border-t border-sidebar-border"><div className="flex items-center space-x-3 mb-3"><div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center"><span className="text-sm font-medium text-sidebar-accent-foreground">NA</span></div><div><p className="text-sm font-medium text-sidebar-foreground">Nguyễn Văn Admin</p><p className="text-xs text-sidebar-foreground/70">Quản trị viên</p></div></div><Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"><LogOut className="w-4 h-4 mr-2" />Đăng xuất</Button></div>
        </div>
      </div>

      <div className="lg:ml-64">
        <header className="bg-card border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground text-balance">Bảng điều khiển</h1>
                <p className="text-muted-foreground mt-1">Tổng quan về tình trạng tài sản và hoạt động gần đây.</p>
              </div>
            </div>
            <Select value={selectedAssetType} onValueChange={setSelectedAssetType}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Lọc theo loại tài sản" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ASSET_TYPES.ALL}><Package className="w-4 h-4 mr-2 inline-block"/>{ASSET_TYPES.ALL}</SelectItem>
                <SelectItem value={ASSET_TYPES.IPAD}><Tablet className="w-4 h-4 mr-2 inline-block"/>{ASSET_TYPES.IPAD}</SelectItem>
                <SelectItem value={ASSET_TYPES.STEM_KIT}><PackagePlus className="w-4 h-4 mr-2 inline-block"/>{ASSET_TYPES.STEM_KIT}</SelectItem>
                <SelectItem value={ASSET_TYPES.RIO_SET}><Boxes className="w-4 h-4 mr-2 inline-block"/>{ASSET_TYPES.RIO_SET}</SelectItem>
                <SelectItem value={ASSET_TYPES.ROVER_SET}><Boxes className="w-4 h-4 mr-2 inline-block"/>{ASSET_TYPES.ROVER_SET}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <main className="p-4 lg:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Tổng số tài sản</CardTitle><Package className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{kpiStats.total}</div><p className="text-xs text-muted-foreground">Toàn bộ tài sản</p></CardContent></Card>
            <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Đang sử dụng</CardTitle><CheckCircle className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{kpiStats.inUse}</div><p className="text-xs text-muted-foreground">{((kpiStats.inUse / kpiStats.total) * 100).toFixed(0)}% tổng số</p></CardContent></Card>
            <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Sẵn sàng</CardTitle><Clock className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{kpiStats.available}</div><p className="text-xs text-muted-foreground">{((kpiStats.available / kpiStats.total) * 100).toFixed(0)}% tổng số</p></CardContent></Card>
            <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Cần sửa chữa</CardTitle><AlertTriangle className="h-4 w-4 text-destructive" /></CardHeader><CardContent><div className="text-2xl font-bold">{kpiStats.needsFix}</div><p className="text-xs text-muted-foreground">{((kpiStats.needsFix / kpiStats.total) * 100).toFixed(0)}% tổng số</p></CardContent></Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Phân bổ Tài sản theo Trường học ({selectedAssetType})</CardTitle></CardHeader>
              <CardContent><ResponsiveContainer width="100%" height={300}>{filteredData.barData.length > 0 ? <BarChart data={filteredData.barData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} /><YAxis /><Tooltip /><Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} /></BarChart> : <div className="flex items-center justify-center h-full text-muted-foreground">Không có dữ liệu</div>}</ResponsiveContainer></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Tài sản theo Trạng thái ({selectedAssetType})</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  {filteredData.pieData.length > 0 ? (
                    <PieChart>
                      <Pie data={filteredData.pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                        {filteredData.pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  ) : <div className="flex items-center justify-center h-full text-muted-foreground">Không có dữ liệu</div>}
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {filteredData.pieData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center"><div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} /><span>{entry.name}</span></div>
                      <span className="font-medium">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Hoạt động Gần đây ({selectedAssetType})</CardTitle></CardHeader>
            <CardContent><ActivityTable activities={filteredData.filteredActivities} /></CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

function ActivityTable({ activities }: { activities: typeof recentActivities }) {
  if (activities.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Không có hoạt động nào cho lựa chọn này.</p>
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b"><th className="text-left py-2 px-4 font-medium">Hành động</th><th className="text-left py-2 px-4 font-medium">Loại/Bộ tài sản</th><th className="text-left py-2 px-4 font-medium">Chi tiết</th><th className="text-left py-2 px-4 font-medium">Người thực hiện</th><th className="text-left py-2 px-4 font-medium">Thời gian</th></tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index} className="border-b last:border-b-0 hover:bg-muted/50">
              <td className="py-3 px-4"><Badge variant={activity.action === "Bàn giao" ? "default" : activity.action === "Thu hồi" ? "secondary" : "destructive"}>{activity.action}</Badge></td>
              <td className="py-3 px-4">{activity.type}</td>
              <td className="py-3 px-4 font-medium">{activity.asset}</td>
              <td className="py-3 px-4">{activity.user}</td>
              <td className="py-3 px-4 text-muted-foreground">{activity.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}