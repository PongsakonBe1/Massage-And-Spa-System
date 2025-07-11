// massage-lms-frontend/src/app/admin/page.tsx
// หน้า Admin Dashboard (Client Component)
// ไม่ต้อง Import AdminLayout เพราะจะถูกห่อหุ้มโดย src/app/admin/layout.tsx โดยอัตโนมัติ

'use client'; // *** สำคัญมาก: ระบุว่าเป็น Client Component ***

import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';

export default function AdminDashboard() {
  return (
    <> {/* ใช้ Fragment แทนการห่อหุ้มด้วย AdminLayout */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">ภาพรวมระบบ Admin</h1>
      <Row gutter={[16, 16]}> {/* เพิ่ม gutter ในแนวตั้งด้วย */}
        {/* Card แสดงจำนวนโรงเรียน */}
        <Col xs={24} sm={12} lg={8}>
          <Card bordered={false} className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Statistic title="จำนวนโรงเรียน" value={112893} className="text-blue-600" />
          </Card>
        </Col>
        {/* Card แสดงจำนวนหลักสูตร */}
        <Col xs={24} sm={12} lg={8}>
          <Card bordered={false} className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Statistic title="จำนวนหลักสูตร" value={1128} precision={0} className="text-green-600" />
          </Card>
        </Col>
        {/* Card แสดงสถิติเกียรติบัตรที่ออกแล้ว */}
        <Col xs={24} sm={12} lg={8}>
          <Card bordered={false} className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Statistic title="เกียรติบัตรที่ออกแล้ว" value={93} suffix="%" className="text-purple-600" />
          </Card>
        </Col>
      </Row>
      {/* ส่วนแสดงกิจกรรมล่าสุด */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">กิจกรรมล่าสุด</h2>
        {/* สามารถเพิ่มตารางหรือรายการกิจกรรมล่าสุดได้ที่นี่ */}
        <p className="text-gray-500">ไม่มีกิจกรรมล่าสุด</p>
      </div>
    </>
  );
}
