"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Menu,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  Boxes,
  Tablet,
} from "lucide-react"

// --- CẤU TRÚC DỮ LIỆU TẬP TRUNG VÀO "BỘ" ---

const ASSET_SETS = {
  IPAD: "iPad",
  RIO_SET: "Bộ Rio",
  ROVER_SET: "Bộ Rover",
}

// Dữ liệu giờ đây quản lý theo từng BỘ, không phải thiết bị lẻ
const allSetsData = [
  { id: "set-rio-01", name: "Bộ Rio #01", type: ASSET_SETS.RIO_SET, status: "Đang sử dụng", school: "Trường THPT A" },
  { id: "set-rio-02", name: "Bộ Rio #02", type: ASSET_SETS.RIO_SET, status: "Sẵn sàng", school: "Kho Trung tâm" },
  { id: "set-rio-03", name: "Bộ Rio #03", type: ASSET_SETS.RIO_SET, status: "Cần sửa chữa", school: "Trường THCS B" },

  { id: "set-rover-01", name: "Bộ Rover #01", type: ASSET_SETS.ROVER_SET, status: "Đang sử dụng", school: "Trường Tiểu học C" },
  { id: "set-rover-02", name: "Bộ Rover #02", type: ASSET_SETS.ROVER_SET, status: "Sẵn sàng", school: "Kho Trung tâm" },
  { id: "set-rover-03", name: "Bộ Rover #03", type: ASSET_SETS.ROVER_SET, status: "Đang sử dụng", school: "Trường THPT D" },
  { id: "set-rover-04", name: "Bộ Rover #04", type: ASSET_SETS.ROVER_SET, status: "Đang sử dụng", school: "Trường THPT A" },
];

// Dữ liệu hoạt động chỉ liên quan đến BỘ
const recentActivities = [
  { action: "Bàn giao", asset: "Bộ Rio #01", type: ASSET_SETS.RIO_SET, user: "Nguyễn Văn A", time: "2 giờ trước" },
  { action: "Thu hồi", asset: "Bộ Rover #02", type: ASSET_SETS.ROVER_SET, user: "Trần Thị B", time: "1 ngày trước" },
  { action: "Bàn giao", asset: "Bộ Rover #01", type: ASSET_SETS.ROVER_SET, user: "Lê Văn C", time: "2 ngày trước" },
];

const PIE_CHART_COLORS = {
  "Đang sử dụng": "hsl(var(--chart-1))",
  "Sẵn sàng": "hsl(var(--chart-2))",
  "Cần sửa chữa": "hsl(var(--chart-3))",
}

// --- COMPONENT CHÍNH ---

export default function Dashboard() {
  // Mặc định chọn Bộ Rio khi tải trang
  const [selectedSetType, setSelectedSetType] = useState(ASSET_SETS.IPAD)

  const processedData = useMemo(() => {
    const filteredSets = allSetsData.filter(set => set.type === selectedSetType);

    const total = filteredSets.length;
    const kpiStats = {
      total: total,
      inUse: filteredSets.filter(a => a.status === "Đang sử dụng").length,
      available: filteredSets.filter(a => a.status === "Sẵn sàng").length,
      needsFix: filteredSets.filter(a => a.status === "Cần sửa chữa").length
    };

    const schoolCounts = filteredSets.reduce((acc, set) => {
      acc[set.school] = (acc[set.school] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const barData = Object.keys(schoolCounts).map(school => ({ name: school, value: schoolCounts[school] }));

    const statusCounts = filteredSets.reduce((acc, set) => {
      acc[set.status] = (acc[set.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const pieData = Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status],
      color: PIE_CHART_COLORS[status as keyof typeof PIE_CHART_COLORS],
    }));

    const filteredActivities = recentActivities.filter(activity => activity.type === selectedSetType);

    return { kpiStats, barData, pieData, filteredActivities };
  }, [selectedSetType]);

  return (
    <div className="min-h-screen bg-background">
      <div className="lg:ml-64">
        <header className="bg-card border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground text-balance">Bảng điều khiển</h1>
              <p className="text-muted-foreground mt-1">Tổng quan tài sản</p>
            </div>
            <Select value={selectedSetType} onValueChange={setSelectedSetType}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Chọn một bộ..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ASSET_SETS.IPAD}><Tablet className="w-4 h-4 mr-2 inline-block" />{ASSET_SETS.IPAD}</SelectItem>
                <SelectItem value={ASSET_SETS.RIO_SET}><Boxes className="w-4 h-4 mr-2 inline-block" />{ASSET_SETS.RIO_SET}</SelectItem>
                <SelectItem value={ASSET_SETS.ROVER_SET}><Boxes className="w-4 h-4 mr-2 inline-block" />{ASSET_SETS.ROVER_SET}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <main className="p-4 lg:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Tổng số bộ</CardTitle><Package className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{processedData.kpiStats.total}</div></CardContent></Card>
            <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Đang sử dụng</CardTitle><CheckCircle className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{processedData.kpiStats.inUse}</div><p className="text-xs text-muted-foreground">{processedData.kpiStats.total > 0 ? `${((processedData.kpiStats.inUse / processedData.kpiStats.total) * 100).toFixed(0)}%` : '0%'}</p></CardContent></Card>
            <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Sẵn sàng</CardTitle><Clock className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{processedData.kpiStats.available}</div><p className="text-xs text-muted-foreground">{processedData.kpiStats.total > 0 ? `${((processedData.kpiStats.available / processedData.kpiStats.total) * 100).toFixed(0)}%` : '0%'}</p></CardContent></Card>
            <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Cần sửa chữa</CardTitle><AlertTriangle className="h-4 w-4 text-destructive" /></CardHeader><CardContent><div className="text-2xl font-bold">{processedData.kpiStats.needsFix}</div><p className="text-xs text-muted-foreground">{processedData.kpiStats.total > 0 ? `${((processedData.kpiStats.needsFix / processedData.kpiStats.total) * 100).toFixed(0)}%` : '0%'}</p></CardContent></Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2"><CardHeader><CardTitle>Phân bổ bộ tại các trường</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}>{processedData.barData.length > 0 ? <BarChart data={processedData.barData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} /></BarChart> : <div className="flex items-center justify-center h-full text-muted-foreground">Không có dữ liệu</div>}</ResponsiveContainer></CardContent></Card>
            <Card><CardHeader><CardTitle>Phân bổ bộ theo trạng thái</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}>{processedData.pieData.length > 0 ? (<PieChart><Pie data={processedData.pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">{processedData.pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie><Tooltip /></PieChart>) : <div className="flex items-center justify-center h-full text-muted-foreground">Không có dữ liệu</div>}</ResponsiveContainer><div className="mt-4 space-y-2">{processedData.pieData.map((entry, index) => (<div key={index} className="flex items-center justify-between text-sm"><div className="flex items-center"><div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} /><span>{entry.name}</span></div><span className="font-medium">{entry.value}</span></div>))}</div></CardContent></Card>
          </div>

          <Card><CardHeader><CardTitle>Hoạt động gần đây</CardTitle></CardHeader><CardContent><ActivityTable activities={processedData.filteredActivities} /></CardContent></Card>
        </main>
      </div>
    </div>
  )
}

function ActivityTable({ activities }: { activities: typeof recentActivities }) {
  if (activities.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Không có hoạt động nào cho bộ này.</p>
  }
  return (<div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b"><th className="text-left py-2 px-4 font-medium">Hành động</th><th className="text-left py-2 px-4 font-medium">Chi tiết</th><th className="text-left py-2 px-4 font-medium">Người thực hiện</th><th className="text-left py-2 px-4 font-medium">Thời gian</th></tr></thead><tbody>{activities.map((activity, index) => (<tr key={index} className="border-b last:border-b-0 hover:bg-muted/50"><td className="py-3 px-4"><Badge variant={activity.action === "Bàn giao" ? "default" : activity.action === "Thu hồi" ? "secondary" : "destructive"}>{activity.action}</Badge></td><td className="py-3 px-4 font-medium">{activity.asset}</td><td className="py-3 px-4">{activity.user}</td><td className="py-3 px-4 text-muted-foreground">{activity.time}</td></tr>))}</tbody></table></div>)
}