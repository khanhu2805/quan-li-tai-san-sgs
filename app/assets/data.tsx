import {
  CheckCircle,
  Clock,
  AlertTriangle,
  HardDrive,
  Tablet,
  Bot,
} from 'lucide-react'

export const statuses = [
  {
    value: 'sẵn sàng',
    label: 'Sẵn sàng',
    icon: Clock,
  },
  {
    value: 'đang sử dụng',
    label: 'Đang sử dụng',
    icon: CheckCircle,
  },
  {
    value: 'cần sửa chữa',
    label: 'Cần sửa chữa',
    icon: AlertTriangle,
  },
]

export const assetTypes = [
  {
    value: 'iPad',
    label: 'iPad',
    icon: Tablet,
  },
  {
    value: 'Rio Kit',
    label: 'Bộ Rio',
    icon: Bot,
  },
  {
    value: 'Rover Kit',
    label: 'Bộ Rover',
    icon: HardDrive,
  },
  {
    value: 'Stem Kit',
    label: 'Bộ Stem Kit',
    icon: HardDrive,
  },
]

export type Asset = {
  id: string
  name: string
  serialNumber: string
  type: 'iPad' | 'Rio Kit' | 'Rover Kit' | 'Stem Kit'
  status: 'sẵn sàng' | 'đang sử dụng' | 'cần sửa chữa'
  location: string
  assignee: string
}

export const assets: Asset[] = [
  {
    id: 'ASSET-001',
    name: 'iPad Pro 11-inch',
    serialNumber: 'SN-A1B2C3D4E5',
    type: 'iPad',
    status: 'đang sử dụng',
    location: 'Trường THPT A',
    assignee: 'Nguyễn Văn A',
  },
  {
    id: 'ASSET-002',
    name: 'Bộ Kit Rio #01',
    serialNumber: 'SN-RIO-001',
    type: 'Rio Kit',
    status: 'sẵn sàng',
    location: 'Kho trung tâm',
    assignee: 'Kho',
  },
  {
    id: 'ASSET-003',
    name: 'Bộ Kit Rover #01',
    serialNumber: 'SN-ROV-001',
    type: 'Rover Kit',
    status: 'cần sửa chữa',
    location: 'Trường THCS B',
    assignee: 'Trần Thị B',
  },
  // Thêm dữ liệu mẫu khác ở đây
]