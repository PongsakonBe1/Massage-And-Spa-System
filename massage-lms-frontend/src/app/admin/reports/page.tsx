'use client';

import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import { Table, Button, Space, DatePicker, Select, message, Tag } from 'antd';
import { DownloadOutlined, SearchOutlined, FileTextOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Report {
  key: string;
  reportName: string;
  dateGenerated: string;
  status: 'สำเร็จ' | 'กำลังประมวลผล' | 'ล้มเหลว';
}

export default function ReportsPage() {
  const dummyReports: Report[] = [
    {
      key: '1',
      reportName: 'รายงานจำนวนนักเรียนรวม',
      dateGenerated: '2023-01-15',
      status: 'สำเร็จ',
    },
    {
      key: '2',
      reportName: 'รายงานหลักสูตรยอดนิยมประจำไตรมาส',
      dateGenerated: '2023-02-20',
      status: 'สำเร็จ',
    },
    {
      key: '3',
      reportName: 'รายงานการออกเกียรติบัตรรายเดือน',
      dateGenerated: '2023-03-10',
      status: 'กำลังประมวลผล',
    },
    {
      key: '4',
      reportName: 'รายงานการเข้าเรียนรายวิชา',
      dateGenerated: '2023-04-05',
      status: 'สำเร็จ',
    },
    {
      key: '5',
      reportName: 'รายงานสรุปผลการสอบ',
      dateGenerated: '2023-05-12',
      status: 'ล้มเหลว',
    },
    {
      key: '6',
      reportName: 'รายงานการเงินประจำปี',
      dateGenerated: '2023-06-01',
      status: 'สำเร็จ',
    },
  ];

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
      // แก้ไข: ระบุ Type ให้ status และใช้งาน status
      render: (status: 'สำเร็จ' | 'กำลังประมวลผล' | 'ล้มเหลว') => {
        let color: string;
        switch (status) {
          case 'สำเร็จ':
            color = 'success';
            break;
          case 'กำลังประมวลผล':
            color = 'processing';
            break;
          case 'ล้มเหลว':
            color = 'error';
            break;
          default:
            color = 'default';
        }
        return (
          <Tag color={color} className="rounded-full px-3 py-1 text-xs font-semibold">
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'การกระทำ',
      key: 'action',
      // แก้ไข: ใช้ _ (underscore) สำหรับ parameter ที่ไม่ได้ใช้ (text) และระบุ Type ให้ record
      render: (_text: string, record: Report) => (
        <Space size="middle">
          <Button
            icon={<DownloadOutlined />}
            disabled={record.status !== 'สำเร็จ'}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm"
          >
            ดาวน์โหลด
          </Button>
        </Space>
      ),
    },
  ];

  const handleGenerateReport = () => {
    message.info('กำลังสร้างรายงาน...');
    // *** Logic สำหรับเรียก API สร้างรายงาน (คุณจะต้องเรียก API ไปยัง Backend ที่นี่) ***
    // ในอนาคต คุณอาจจะส่ง parameter เช่น ช่วงวันที่ หรือประเภทรายงาน ไปกับ API call
    // console.log('Generating report for:', selectedDateRange, selectedReportType);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">จัดการรายงาน</h1>
      <Space className="mb-8 flex flex-wrap gap-4 items-center">
        <RangePicker className="rounded-lg shadow-sm" />
        <Select defaultValue="all" style={{ width: 250 }} className="rounded-lg shadow-sm" placeholder="เลือกประเภทรายงาน">
          <Option value="all">ทุกประเภทรายงาน</Option>
          <Option value="student_count">รายงานจำนวนนักเรียน</Option>
          <Option value="popular_courses">รายงานหลักสูตรยอดนิยม</Option>
          <Option value="certificate_issuance">รายงานการออกเกียรติบัตร</Option>
          <Option value="attendance">รายงานการเข้าเรียน</Option>
          <Option value="exam_results">รายงานสรุปผลการสอบ</Option>
          <Option value="financial">รายงานการเงิน</Option>
        </Select>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
        >
          ค้นหา
        </Button>
        <Button
          onClick={handleGenerateReport}
          icon={<FileTextOutlined />}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md px-6 py-3 text-base"
        >
          สร้างรายงานใหม่
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={dummyReports}
        className="rounded-xl shadow-custom-light"
        pagination={{ pageSize: 10 }}
        bordered={false}
      />
    </>
  );
}