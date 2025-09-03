import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const templates = [
    { name: "VEX GO Kit", components: "1 Brain, 4 Motors, 2 Sensors, ...", assetCount: 15 },
    { name: "LEGO Education SPIKE Prime", components: "1 Hub, 3 Motors, 3 Sensors, ...", assetCount: 8 },
    { name: "mBot Neo", components: "1 mCore, 2 Motors, 1 Ultrasonic Sensor, ...", assetCount: 12 },
]

export default function TemplatesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
             <div className="flex items-center">
                 <h1 className="text-lg font-semibold md:text-2xl">Quản lý Mẫu Kit</h1>
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Tạo mẫu mới
                    </span>
                    </Button>
                </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Danh sách Mẫu</CardTitle>
                <CardDescription>
                  Tạo và quản lý các mẫu bộ kit robot để đơn giản hóa việc thêm tài sản mới.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên Mẫu</TableHead>
                      <TableHead>Linh kiện chính</TableHead>
                      <TableHead>Số lượng tài sản</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((template) => (
                      <TableRow key={template.name}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.components}</TableCell>
                        <TableCell>{template.assetCount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
        </main>
      </div>
    </div>
  )
}