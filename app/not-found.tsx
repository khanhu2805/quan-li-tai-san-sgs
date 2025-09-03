import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-background">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-foreground">Trang không tồn tại</h2>
      <p className="mt-2 text-muted-foreground">
        Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Quay về Bảng điều khiển</Link>
      </Button>
    </div>
  )
}