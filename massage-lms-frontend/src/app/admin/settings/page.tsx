'use client';

import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import { Typography, Empty } from 'antd';

const { Title, Paragraph } = Typography; // Title ถูกใช้แล้ว

export default function SettingsPage() {
  return (
    <>
      {/* *** แก้ไข: ใช้ Title component แทน h1 *** */}
      <Title level={1} className="text-3xl font-bold mb-8 text-gray-800">Setting</Title>
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl shadow-custom-light">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="text-gray-500 text-lg">
              ยังไม่มีการตั้งค่าที่แสดงผล
            </span>
          }
        />
        <Paragraph className="mt-4 text-gray-600 text-center">
          หน้านี้จะใช้สำหรับกำหนดค่าต่างๆ ของระบบ เช่น ข้อมูลองค์กร, การตั้งค่าทั่วไป
        </Paragraph>
      </div>
    </>
  );
}
