'use client'; // *** สำคัญมาก: ระบุว่าเป็น Client Component ***

import React from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  UserOutlined,
  BookOutlined,
  SettingOutlined,
  FileTextOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // สำหรับตรวจสอบ active menu item

const { Header, Content, Sider } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname(); // Hook สำหรับ App Router เพื่อดู path ปัจจุบัน

  // กำหนด selectedKeys ตาม pathname เพื่อให้เมนู Active ถูกต้อง
  const getSelectedKey = (path: string) => {
    if (path === '/admin') return '1';
    if (path.startsWith('/admin/schools')) return '2';
    if (path.startsWith('/admin/courses')) return '3';
    if (path.startsWith('/admin/templates')) return '4';
    if (path.startsWith('/admin/reports')) return '5';
    return '1'; // Default to dashboard
  };

  const selectedKey = getSelectedKey(pathname);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={250} // กำหนดความกว้างของ Sider
        className="shadow-lg" // เพิ่ม Tailwind class สำหรับเงา
      >
        <div className="demo-logo-vertical flex items-center justify-center h-16 text-white text-2xl font-bold">
          LMS Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]} // ใช้ selectedKeys เพื่อควบคุม active item
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: <Link href="/admin">Dashboard</Link>,
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: <Link href="/admin/schools">ข้อมูลโรงเรียน</Link>,
            },
            {
              key: '3',
              icon: <BookOutlined />,
              label: <Link href="/admin/courses">ข้อมูลหลักสูตร</Link>,
            },
            {
              key: '4',
              icon: <SettingOutlined />,
              label: <Link href="/admin/templates">แม่แบบเทมเพลต</Link>,
            },
            {
              key: '5',
              icon: <FileTextOutlined />,
              label: <Link href="/admin/reports">รายงาน</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className="shadow-md" /> {/* เพิ่ม Tailwind class */}
        <Content style={{ margin: '24px 16px 0', overflowY: 'auto', overflowX: 'hidden' }}> {/* เพิ่ม overflowY: 'auto' */}
          <div
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 112px)', // ปรับ minHeight ให้พอดีกับ Header และ Margin
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="rounded-lg shadow-inner" // เพิ่ม Tailwind class
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

