'use client'; // *** สำคัญมาก: ระบุว่าเป็น Client Component ***

import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import { Card, Col, Row, List, Typography, Progress } from 'antd';
import {
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  WalletOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

export default function AdminDashboard() {
  const latestActivities = [
    { id: '1', type: 'โรงเรียน', description: 'เพิ่มโรงเรียนใหม่: โรงเรียนอนุบาลบ้านเด็กดี', date: '2023-07-10' },
    { id: '2', type: 'หลักสูตร', description: 'แก้ไขหลักสูตร: นวดแผนไทยขั้นสูง', date: '2023-07-09' },
    { id: '3', type: 'เกียรติบัตร', description: 'ออกเกียรติบัตรให้: สมชาย ใจดี', date: '2023-07-08' },
    { id: '4', type: 'รายงาน', description: 'สร้างรายงาน: สรุปจำนวนนักเรียนประจำเดือน', date: '2023-07-07' },
    { id: '5', type: 'โรงเรียน', description: 'ลบโรงเรียน: โรงเรียนแสงอรุณ', date: '2023-07-06' },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
      <Row gutter={[24, 24]}>
        {/* Summary Cards */}
        <Col xs={24} sm={12} lg={6}>
          <Card variant='borderless' className="summary-card bg-white">
            <div className="icon-wrapper bg-pink-500">
              <UserOutlined />
            </div>
            <div>
              <div className="ant-statistic-title">Student</div>
              <div className="ant-statistic-content">36</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant='borderless' className="summary-card bg-white">
            <div className="icon-wrapper bg-purple-500">
              <BookOutlined />
            </div>
            <div>
              <div className="ant-statistic-title">Course</div>
              <div className="ant-statistic-content">12</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant='borderless' className="summary-card bg-white">
            <div className="icon-wrapper bg-green-500">
              <DollarOutlined />
            </div>
            <div>
              <div className="ant-statistic-title">Revenue</div>
              <div className="ant-statistic-content">6500</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant='borderless' className="summary-card bg-white">
            <div className="icon-wrapper bg-orange-500">
              <WalletOutlined />
            </div>
            <div>
              <div className="ant-statistic-title">Pending Payments</div>
              <div className="ant-statistic-content">65</div>
            </div>
          </Card>
        </Col>

        {/* Charts Section */}
        <Col xs={24} lg={16}>
          <Card variant='borderless' className="rounded-xl shadow-custom-light h-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Revenue</h2>
            {/* Placeholder for Revenue Chart */}
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg text-gray-500">
              [กราฟรายได้จะแสดงที่นี่]
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card variant='borderless' className="rounded-xl shadow-custom-light h-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Popular courses</h2>
            {/* Placeholder for Popular Courses */}
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg text-gray-500">
              [กราฟหลักสูตรยอดนิยมจะแสดงที่นี่]
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card variant='borderless' className="rounded-xl shadow-custom-light h-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Student activity</h2>
            {/* Placeholder for Student Activity Chart (Pie Chart) */}
            <div className="flex justify-center items-center h-48 bg-gray-100 rounded-lg">
              <Progress type="circle" percent={75} size={120} format={() => '75%'} />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card variant='borderless' className="rounded-xl shadow-custom-light h-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment status</h2>
            {/* Placeholder for Payment Status (Bar Chart / Progress bars) */}
            <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
              <div>
                <Text className="text-gray-600">Complete</Text>
                <Progress percent={80} showInfo={false} strokeColor="#52c41a" />
              </div>
              <div>
                <Text className="text-gray-600">Unpaid</Text>
                <Progress percent={15} showInfo={false} strokeColor="#faad14" />
              </div>
              <div>
                <Text className="text-gray-600">Pending</Text>
                <Progress percent={5} showInfo={false} strokeColor="#1890ff" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Latest Activities Section */}
      <div className="mt-10 p-8 bg-white rounded-xl shadow-custom-light">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">กิจกรรมล่าสุด</h2>
        <List
          itemLayout="horizontal"
          dataSource={latestActivities}
          renderItem={item => (
            <List.Item className="py-3 border-b border-gray-100 last:border-b-0">
              <List.Item.Meta
                avatar={<CalendarOutlined className="text-gray-500 text-xl" />}
                title={<Text strong className="text-gray-800">{item.description}</Text>}
                description={<Text type="secondary" className="text-sm">{item.type} เมื่อ: {item.date}</Text>}
              />
            </List.Item>
          )}
        />
        {latestActivities.length === 0 && (
          <p className="text-gray-500 text-center py-4">ไม่มีกิจกรรมล่าสุด</p>
        )}
      </div>
    </>
  );
}