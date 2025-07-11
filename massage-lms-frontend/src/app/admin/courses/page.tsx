// massage-lms-frontend/src/app/admin/courses/page.tsx
// หน้าสำหรับจัดการข้อมูลหลักสูตร (Client Component)
// ไม่ต้อง Import AdminLayout เพราะจะถูกห่อหุ้มโดย src/app/admin/layout.tsx โดยอัตโนมัติ

'use client'; // *** สำคัญมาก: ระบุว่าเป็น Client Component ***

import React from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface Course {
  key: string;
  name: string;
  duration: string;
  description: string;
}

export default function CoursesPage() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingCourse, setEditingCourse] = React.useState<Course | null>(null);
  const [form] = Form.useForm();

  // ข้อมูลหลักสูตรจำลอง (Dummy Data)
  const dummyCourses: Course[] = [
    {
      key: '1',
      name: 'หลักสูตรนวดแผนไทยเบื้องต้น',
      duration: '40 ชั่วโมง',
      description: 'เรียนรู้เทคนิคการนวดแผนไทยพื้นฐาน',
    },
    {
      key: '2',
      name: 'หลักสูตรสปาเพื่อสุขภาพ',
      duration: '60 ชั่วโมง',
      description: 'เรียนรู้การทำสปาและทรีทเม้นท์ต่างๆ',
    },
    {
      key: '3',
      name: 'หลักสูตรอโรมาเธอราพี',
      duration: '30 ชั่วโมง',
      description: 'เรียนรู้การใช้น้ำมันหอมระเหยเพื่อการบำบัด',
    },
  ];

  // กำหนด Columns สำหรับตาราง Ant Design
  const columns = [
    {
      title: 'ชื่อหลักสูตร',
      dataIndex: 'name',
      key: 'name',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'ระยะเวลา',
      dataIndex: 'duration',
      key: 'duration',
      className: 'text-gray-700',
    },
    {
      title: 'คำอธิบาย',
      dataIndex: 'description',
      key: 'description',
      className: 'text-gray-700',
    },
    {
      title: 'การกระทำ',
      key: 'action',
      render: (_: unknown, record: Course) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm"
          >
            แก้ไข
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key)}
            className="rounded-md shadow-sm"
          >
            ลบ
          </Button>
        </Space>
      ),
    },
  ];

  // ฟังก์ชันสำหรับเปิด Modal เพิ่มหลักสูตร
  const handleAdd = () => {
    setEditingCourse(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // ฟังก์ชันสำหรับเปิด Modal แก้ไขหลักสูตร
  const handleEdit = (record: Course) => {
    setEditingCourse(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // ฟังก์ชันสำหรับลบหลักสูตร
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลหลักสูตรนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        // *** Logic สำหรับลบข้อมูลจริง (คุณจะต้องเรียก API ไปยัง Backend ที่นี่) ***
        message.success('ลบข้อมูลหลักสูตรสำเร็จ!');
      },
    });
  };

  // ฟังก์ชันเมื่อกดปุ่ม OK ใน Modal (เพิ่ม/แก้ไข)
  const handleOk = () => {
    form.validateFields()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(values => {
        if (editingCourse) {
          // *** Logic สำหรับอัปเดตข้อมูลจริง (คุณจะต้องเรียก API ไปยัง Backend ที่นี่) ***
          message.success('อัปเดตข้อมูลหลักสูตรสำเร็จ!');
        } else {
          // *** Logic สำหรับเพิ่มข้อมูลจริง (คุณจะต้องเรียก API ไปยัง Backend ที่นี่) ***
          message.success('เพิ่มข้อมูลหลักสูตรสำเร็จ!');
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  // ฟังก์ชันเมื่อกดปุ่ม Cancel ใน Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">จัดการข้อมูลหลักสูตร</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        className="mb-4 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md"
      >
        เพิ่มหลักสูตรใหม่
      </Button>
      <Table
        columns={columns}
        dataSource={dummyCourses}
        className="rounded-lg shadow-md"
        pagination={{ pageSize: 10 }}
      />

      {/* Modal สำหรับเพิ่ม/แก้ไขข้อมูลหลักสูตร */}
      <Modal
        title={editingCourse ? 'แก้ไขข้อมูลหลักสูตร' : 'เพิ่มหลักสูตรใหม่'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="rounded-lg"
      >
        <Form
          form={form}
          layout="vertical"
          name="course_form"
          className="p-4"
        >
          <Form.Item
            name="name"
            label="ชื่อหลักสูตร"
            rules={[{ required: true, message: 'กรุณากรอกชื่อหลักสูตร!' }]}
          >
            <Input placeholder="เช่น หลักสูตรนวดแผนไทย" className="rounded-md" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="ระยะเวลา"
            rules={[{ required: true, message: 'กรุณากรอกระยะเวลาหลักสูตร!' }]}
          >
            <Input placeholder="เช่น 40 ชั่วโมง" className="rounded-md" />
          </Form.Item>
          <Form.Item
            name="description"
            label="คำอธิบาย"
          >
            <Input.TextArea rows={4} placeholder="รายละเอียดเกี่ยวกับหลักสูตร" className="rounded-md" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
