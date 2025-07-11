'use client'; // *** สำคัญมาก: ระบุว่าเป็น Client Component ***

import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import { Layout, Menu, theme, Breadcrumb, Avatar } from 'antd';
import {
  DashboardOutlined,
  BookOutlined,
  UsergroupAddOutlined, // สำหรับ Student
  QuestionCircleOutlined, // สำหรับ Quiz
  DollarCircleOutlined, // สำหรับ Payment
  FileTextOutlined, // สำหรับ Certificate
  SettingOutlined, // สำหรับ Setting
  HomeOutlined, // สำหรับ Breadcrumb Home
  UserOutlined, // สำหรับ Admin Profile Icon
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// *** สำคัญ: Import Image component จาก next/image ***
import Image from 'next/image';

const { Header, Content, Sider } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const pathname = usePathname();

  // กำหนด selectedKeys ตาม pathname เพื่อให้เมนู Active ถูกต้อง
  const getSelectedKey = (path: string) => {
    if (path === '/admin') return '1';
    if (path.startsWith('/admin/courses')) return '2';
    if (path.startsWith('/admin/students')) return '3';
    if (path.startsWith('/admin/quizzes')) return '4';
    if (path.startsWith('/admin/payments')) return '5';
    if (path.startsWith('/admin/certificates')) return '6';
    if (path.startsWith('/admin/settings')) return '7';
    return '1';
  };

  const selectedKey = getSelectedKey(pathname);

  // สร้าง Breadcrumbs items
  const breadcrumbItems = pathname
    .split('/')
    .filter(segment => segment) // กรอง segment ที่ว่างออกไป
    .map((segment, index, array) => {
      const url = `/${array.slice(0, index + 1).join('/')}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1); // ทำให้ตัวแรกเป็นพิมพ์ใหญ่
      return {
        key: url,
        title: <Link href={url}>{name}</Link>,
      };
    });

  // เพิ่ม Home icon ใน Breadcrumbs
  const finalBreadcrumbItems = [
    {
      key: '/',
      title: <Link href="/"><HomeOutlined /></Link>,
    },
    ...breadcrumbItems,
  ];

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
        width={250}
        className="shadow-lg"
      >
        {/* โลโก้ RelaxPlus */}
        <div className="flex items-center justify-center h-20 py-4 border-b border-gray-700">
          {/* *** แก้ไข: ใช้ Image component แทน img *** */}
          <Image
            src="https://placehold.co/40x40/FFFFFF/000000?text=Logo"
            alt="RelaxPlus Logo"
            width={40} // กำหนด width
            height={40} // กำหนด height
            className="h-10 w-10 mr-2 rounded-full"
            unoptimized={true} // สำหรับภาพ Placeholder
          />
          <span className="text-white text-2xl font-bold">RelaxPlus</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          className="pt-4"
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: <Link href="/admin">Dashboard</Link>,
            },
            {
              key: '2',
              icon: <BookOutlined />,
              label: <Link href="/admin/courses">Course</Link>,
            },
            {
              key: '3',
              icon: <UsergroupAddOutlined />,
              label: <Link href="/admin/students">Student</Link>,
            },
            {
              key: '4',
              icon: <QuestionCircleOutlined />,
              label: <Link href="/admin/quizzes">Quiz</Link>,
            },
            {
              key: '5',
              icon: <DollarCircleOutlined />,
              label: <Link href="/admin/payments">Payment</Link>,
            },
            {
              key: '6',
              icon: <FileTextOutlined />,
              label: <Link href="/admin/certificates">Certificate</Link>,
            },
            {
              key: '7',
              icon: <SettingOutlined />,
              label: <Link href="/admin/settings">Setting</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        {/* Header ของ Admin Layout */}
        <Header style={{ background: colorBgContainer }} className="shadow-sm border-b border-gray-200 flex items-center justify-between px-6">
          <Breadcrumb items={finalBreadcrumbItems} className="text-gray-600" />
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium">ADMIN</span>
            <Avatar size="large" icon={<UserOutlined />} className="bg-gray-300 text-gray-700" />
          </div>
        </Header>
        {/* Content Area ที่จะแสดงหน้าย่อยต่างๆ */}
        <Content style={{ margin: '24px 16px 0', overflowY: 'auto', overflowX: 'hidden' }}>
          <div
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 112px)',
              background: colorBgContainer,
            }}
            className="rounded-lg shadow-md bg-white"
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
