"use client" // Component này xử lý logic phía client

import { useState } from 'react'
import { Sidebar } from '@/components/ui-custom/sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import { SidebarMobile } from './sidebar-mobile'

export function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    // useState được quản lý an toàn bên trong Client Component
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar cho màn hình lớn (Desktop) */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Vùng nội dung chính */}
            <div className="flex-1">
                {/* Header cho màn hình nhỏ (Mobile) với nút hamburger */}
                <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 lg:hidden">
                    <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen} >
                        <SheetTitle className="sr-only">Menu Chính</SheetTitle>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="shrink-0">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Mở menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0">
                            {/* Nội dung sidebar sẽ được hiển thị trong menu trượt này */}
                            <SidebarMobile />
                        </SheetContent>
                    </Sheet>
                </header>

                {/* {children} chính là nội dung của các trang, ví dụ page.tsx */}
                <main>{children}</main>
            </div>
        </div>
    )
}
