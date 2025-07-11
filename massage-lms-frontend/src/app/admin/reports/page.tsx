// massage-lms-frontend/src/app/admin/reports/page.tsx
// หน้าสำหรับจัดการรายงาน (Client Component)
// ไม่ต้อง Import AdminLayout เพราะจะถูกห่อหุ้มโดย src/app/admin/layout.tsx โดยอัตโนมัติ

'use client'; // *** สำคัญมาก: ระบุว่าเป็น Client Component ***

import React from 'react';
import { Table, Button, Space, DatePicker, Select, message } from 'antd';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Report {
  key: string;
  reportName: string;
  dateGenerated: string;
  status: string;
}

export default function ReportsPage() {
  // ข้อมูลรายงานจำลอง (Dummy Data)
  const dummyReports: Report[] = [
    {
      key: '1',
      reportName: 'รายงานจำนวนนักเรียน',
      dateGenerated: '2023-01-15',
      status: 'สำเร็จ',
    },
    {
      key: '2',
      reportName: 'รายงานหลักสูตรยอดนิยม',
      dateGenerated: '2023-02-20',
      status: 'สำเร็จ',
    },
    {
      key: '3',
      reportName: 'รายงานการออกเกียรติบัตร',
      dateGenerated: '2023-03-10',
      status: 'กำลังประมวลผล',
    },
    {
      key: '4',
      reportName: 'รายงานการเข้าเรียน',
      dateGenerated: '2023-04-05',
      status: 'สำเร็จ',
    },
  ];

  // กำหนด Columns สำหรับตาราง Ant Design
  const columns = [
    {
      title: 'ชื่อรายงาน',
      dataIndex: 'reportName',
      key: 'reportName',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'วันที่สร้าง',
      dataIndex: 'dateGenerated',
      key: 'dateGenerated',
      className: 'text-gray-700',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          status === 'สำเร็จ' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
      ),
    },
    {
      title: 'การกระทำ',
      key: 'action',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Report) => (
        <Space size="middle">
          <Button
            icon={<DownloadOutlined />}
            disabled={record.status !== 'สำเร็จ'} // ปุ่มดาวน์โหลดจะใช้งานได้เมื่อสถานะเป็น 'สำเร็จ' เท่านั้น
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" // Tailwind class
          >
            ดาวน์โหลด
          </Button>
        </Space>
      ),
    },
  ];

  // ฟังก์ชันสำหรับสร้างรายงานใหม่
  const handleGenerateReport = () => {
    message.info('กำลังสร้างรายงาน...');
    // *** Logic สำหรับเรียก API สร้างรายงาน (คุณจะต้องเรียก API ไปยัง Backend ที่นี่) ***
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">จัดการรายงาน</h1>
      {/* ส่วนสำหรับ Filter และ Generate Report */}
      <Space className="mb-6 flex flex-wrap gap-4 items-center">
        <RangePicker className="rounded-md shadow-sm" /> {/* ตัวเลือกช่วงวันที่ */}
        <Select defaultValue="all" style={{ width: 200 }} className="rounded-md shadow-sm">
          <Option value="all">ทุกประเภทรายงาน</Option>
          <Option value="student_count">รายงานจำนวนนักเรียน</Option>
          <Option value="popular_courses">รายงานหลักสูตรยอดนิยม</Option>
          <Option value="certificate_issuance">รายงานการออกเกียรติบัตร</Option>
          <Option value="attendance">รายงานการเข้าเรียน</Option>
        </Select>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
        >
          ค้นหา
        </Button>
        <Button
          onClick={handleGenerateReport}
          className="bg-purple-500 hover:bg-purple-600 text-white rounded-md shadow-md"
        >
          สร้างรายงานใหม่
        </Button>
      </Space>
      {/* ตารางแสดงรายการรายงาน */}
      <Table
        columns={columns}
        dataSource={dummyReports}
        className="rounded-lg shadow-md"
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}
