// components/sidebar-content.jsx

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Package, Users, FileText, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';

const navigation = [
  { name: 'Bảng điều khiển', href: '/', icon: Home },
  { name: 'Quản lý Tài sản', href: '/assets', icon: Package },
  { name: 'Quản lý Đối tượng', href: '/users', icon: Users },
  { name: 'Báo cáo & Biên bản', href: '/reports', icon: FileText },
  { name: 'Cài đặt', href: '/settings', icon: Settings },
  // Thêm các mục khác để kiểm tra scroll
  // { name: 'Mục Test 1', href: '/test1', icon: Settings },
  // { name: 'Mục Test 2', href: '/test2', icon: Settings },
  // { name: 'Mục Test 3', href: '/test3', icon: Settings },
  // { name: 'Mục Test 4', href: '/test4', icon: Settings },
  // { name: 'Mục Test 5', href: '/test5', icon: Settings },
];

export function SidebarMobile() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-sidebar">
      <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <Image src="/logosgs.png" alt="Logo" width={60} height={60} />
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">SAIGON STEM</h1>
            <p className="text-xs text-sidebar-foreground/70">Quản lý tài sản</p>
          </div>
        </div>
      </div>
      
      {/* 👇 THAY ĐỔI DUY NHẤT Ở ĐÂY 👇 */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map(item => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start text-left ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </Button>
          );
        })}
      </nav>
      
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
        <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
          <LogOut className="w-4 h-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}