// massage-lms-frontend/src/app/admin/schools/page.tsx
// หน้าสำหรับจัดการข้อมูลโรงเรียน (Client Component)
// ไม่ต้อง Import AdminLayout เพราะจะถูกห่อหุ้มโดย src/app/admin/layout.tsx โดยอัตโนมัติ

'use client'; // *** สำคัญมาก: ระบุว่าเป็น Client Component ***

import React from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// กำหนด Type สำหรับข้อมูลโรงเรียน
interface School {
  key: string;
  name: string;
  address: string;
  contact: string;
}

export default function SchoolsPage() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingSchool, setEditingSchool] = React.useState<School | null>(null);
  const [form] = Form.useForm();

  // ข้อมูลโรงเรียนจำลอง (Dummy Data)
  const dummySchools: School[] = [
    {
      key: '1',
      name: 'โรงเรียนสาธิต ม.เกษตรศาสตร์',
      address: 'กรุงเทพมหานคร',
      contact: '02-123-4567',
    },
    {
      key: '2',
      name: 'โรงเรียนเตรียมอุดมศึกษา',
      address: 'กรุงเทพมหานคร',
      contact: '02-765-4321',
    },
    {
      key: '3',
      name: 'โรงเรียนบดินทรเดชา (สิงห์ สิงหเสนี)',
      address: 'กรุงเทพมหานคร',
      contact: '02-987-6543',
    },
    {
      key: '4',
      name: 'โรงเรียนสวนกุหลาบวิทยาลัย',
      address: 'กรุงเทพมหานคร',
      contact: '02-111-2222',
    },
  ];

  // กำหนด Columns สำหรับตาราง Ant Design
  const columns = [
    {
      title: 'ชื่อโรงเรียน',
      dataIndex: 'name',
      key: 'name',
      className: 'font-medium text-gray-900', // Tailwind class
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
      key: 'address',
      className: 'text-gray-700', // Tailwind class
    },
    {
      title: 'เบอร์ติดต่อ',
      dataIndex: 'contact',
      key: 'contact',
      className: 'text-gray-700', // Tailwind class
    },
    {
      title: 'การกระทำ',
      key: 'action',
      render: (_: unknown, record: School) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm" // Tailwind class
          >
            แก้ไข
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key)}
            className="rounded-md shadow-sm" // Tailwind class
          >
            ลบ
          </Button>
        </Space>
      ),
    },
  ];

  // ฟังก์ชันสำหรับเปิด Modal เพิ่มโรงเรียน
  const handleAdd = () => {
    setEditingSchool(null); // ตั้งค่าเป็น null เพื่อระบุว่าเป็นการเพิ่มใหม่
    form.resetFields(); // ล้างข้อมูลในฟอร์ม
    setIsModalVisible(true); // เปิด Modal
  };

  // ฟังก์ชันสำหรับเปิด Modal แก้ไขโรงเรียน
  const handleEdit = (record: School) => {
    setEditingSchool(record); // ตั้งค่าข้อมูลโรงเรียนที่กำลังแก้ไข
    form.setFieldsValue(record); // กำหนดค่าในฟอร์มตามข้อมูลที่เลือก
    setIsModalVisible(true); // เปิด Modal
  };

  // ฟังก์ชันสำหรับลบโรงเรียน
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDelete = (_key: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลโรงเรียนนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        // *** Logic สำหรับลบข้อมูลจริง (คุณจะต้องเรียก API ไปยัง Backend ที่นี่) ***
        message.success('ลบข้อมูลโรงเรียนสำเร็จ!');
        // หลังจากลบสำเร็จ คุณอาจจะต้องดึงข้อมูลใหม่จาก Backend หรืออัปเดต State
      },
    });
  };

  // ฟังก์ชันเมื่อกดปุ่ม OK ใน Modal (เพิ่ม/แก้ไข)
  const handleOk = () => {
    form.validateFields() // ตรวจสอบความถูกต้องของข้อมูลในฟอร์ม
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(_values => {
        if (editingSchool) {
          // *** Logic สำหรับอัปเดตข้อมูลจริง (คุณจะต้องเรียก API ไปยัง Backend ที่นี่) ***
          message.success('อัปเดตข้อมูลโรงเรียนสำเร็จ!');
        } else {
          // *** Logic สำหรับเพิ่มข้อมูลจริง (คุณจะต้องเรียก API ไปยัง Backend ที่นี่) ***
          message.success('เพิ่มข้อมูลโรงเรียนสำเร็จ!');
        }
        setIsModalVisible(false); // ปิด Modal
      })
      .catch(info => {
        console.log('Validate Failed:', info); // แสดงข้อผิดพลาดในการ Validate
      });
  };

  // ฟังก์ชันเมื่อกดปุ่ม Cancel ใน Modal
  const handleCancel = () => {
    setIsModalVisible(false); // ปิด Modal
  };

  return (
    <> {/* ใช้ Fragment แทนการห่อหุ้มด้วย AdminLayout */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">จัดการข้อมูลโรงเรียน</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        className="mb-4 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md" // Tailwind class
      >
        เพิ่มโรงเรียนใหม่
      </Button>
      <Table
        columns={columns}
        dataSource={dummySchools}
        className="rounded-lg shadow-md" // Tailwind class
        pagination={{ pageSize: 10 }} // เพิ่ม pagination
      />

      {/* Modal สำหรับเพิ่ม/แก้ไขข้อมูลโรงเรียน */}
      <Modal
        title={editingSchool ? 'แก้ไขข้อมูลโรงเรียน' : 'เพิ่มโรงเรียนใหม่'}
        open={isModalVisible} // ใช้ 'open' แทน 'visible' สำหรับ Ant Design V5
        onOk={handleOk}
        onCancel={handleCancel}
        className="rounded-lg" // Tailwind class
      >
        <Form
          form={form}
          layout="vertical"
          name="school_form"
          className="p-4" // Tailwind class
        >
          <Form.Item
            name="name"
            label="ชื่อโรงเรียน"
            rules={[{ required: true, message: 'กรุณากรอกชื่อโรงเรียน!' }]}
          >
            <Input placeholder="เช่น โรงเรียนสาธิต ม.เกษตรศาสตร์" className="rounded-md" /> {/* Tailwind class */}
          </Form.Item>
          <Form.Item
            name="address"
            label="ที่อยู่"
            rules={[{ required: true, message: 'กรุณากรอกที่อยู่!' }]}
          >
            <Input placeholder="เช่น กรุงเทพมหานคร" className="rounded-md" /> {/* Tailwind class */}
          </Form.Item>
          <Form.Item
            name="contact"
            label="เบอร์ติดต่อ"
            rules={[{ required: true, message: 'กรุณากรอกเบอร์ติดต่อ!' }]}
          >
            <Input placeholder="เช่น 02-123-4567" className="rounded-md" /> {/* Tailwind class */}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
