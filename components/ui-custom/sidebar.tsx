// components/sidebar.jsx

import { SidebarMobile } from './sidebar-mobile'; // Import component nội dung

export function Sidebar() {
  return (
    // Đây là cái khung cố định cho desktop, ẩn trên mobile
    <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r bg-sidebar border-sidebar-border hidden lg:flex lg:flex-col">
      <SidebarMobile />
    </aside>
  );
}