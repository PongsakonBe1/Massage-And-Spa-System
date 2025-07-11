'use client'; // *** สำคัญมาก: ระบุว่าเป็น Client Component ***

import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import { Card, Col, Row, Statistic, List, Typography } from 'antd';
import { UserOutlined, BookOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons';

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
    <> {/* ใช้ Fragment แทนการห่อหุ้มด้วย AdminLayout */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">ภาพรวมระบบ Admin</h1>
      <Row gutter={[24, 24]}> {/* เพิ่ม gutter ในแนวตั้งและแนวนอน */}
        {/* Card แสดงจำนวนโรงเรียน */}
        <Col xs={24} sm={12} lg={8}>
          <Card variant='borderless' className="rounded-xl shadow-custom-light hover:shadow-custom-medium transition-shadow duration-300">
            <Statistic
              title={<span className="text-gray-600 text-lg">จำนวนโรงเรียน</span>}
              value={112893}
              prefix={<UserOutlined className="text-blue-500 text-3xl" />}
              valueStyle={{ color: '#1890ff', fontSize: '2.5rem' }}
            />
          </Card>
        </Col>
        {/* Card แสดงจำนวนหลักสูตร */}
        <Col xs={24} sm={12} lg={8}>
          <Card variant='borderless' className="rounded-xl shadow-custom-light hover:shadow-custom-medium transition-shadow duration-300">
            <Statistic
              title={<span className="text-gray-600 text-lg">จำนวนหลักสูตร</span>}
              value={1128}
              precision={0}
              prefix={<BookOutlined className="text-green-500 text-3xl" />}
              valueStyle={{ color: '#52c41a', fontSize: '2.5rem' }}
            />
          </Card>
        </Col>
        {/* Card แสดงสถิติเกียรติบัตรที่ออกแล้ว */}
        <Col xs={24} sm={12} lg={8}>
          <Card variant='borderless' className="rounded-xl shadow-custom-light hover:shadow-custom-medium transition-shadow duration-300">
            <Statistic
              title={<span className="text-gray-600 text-lg">เกียรติบัตรที่ออกแล้ว</span>}
              value={93}
              suffix="%"
              prefix={<FileTextOutlined className="text-purple-500 text-3xl" />}
              valueStyle={{ color: '#9254de', fontSize: '2.5rem' }}
            />
          </Card>
        </Col>
      </Row>
      {/* ส่วนแสดงกิจกรรมล่าสุด */}
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