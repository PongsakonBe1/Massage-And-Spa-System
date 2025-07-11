'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface Course {
  key: string;
  name: string;
  duration: string;
  description: string;
}

interface CourseFormValues {
  name: string;
  duration: string;
  description: string;
}

export default function CoursesPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form] = Form.useForm<CourseFormValues>();

  // *** แก้ไข: ใช้ useState เพื่อจัดการข้อมูลหลักสูตรใน State ***
  const [courses, setCourses] = useState<Course[]>([
    {
      key: '1',
      name: 'หลักสูตรนวดแผนไทยเบื้องต้น',
      duration: '40 ชั่วโมง',
      description: 'เรียนรู้เทคนิคการนวดแผนไทยพื้นฐานและประวัติศาสตร์',
    },
    {
      key: '2',
      name: 'หลักสูตรสปาเพื่อสุขภาพ',
      duration: '60 ชั่วโมง',
      description: 'เรียนรู้การทำสปาและทรีทเม้นท์ต่างๆ เพื่อสุขภาพและความผ่อนคลาย',
    },
    {
      key: '3',
      name: 'หลักสูตรอโรมาเธอราพี',
      duration: '30 ชั่วโมง',
      description: 'เรียนรู้การใช้น้ำมันหอมระเหยเพื่อการบำบัดและเทคนิคการผสม',
    },
    {
      key: '4',
      name: 'หลักสูตรนวดกดจุดเท้า',
      duration: '20 ชั่วโมง',
      description: 'เรียนรู้การนวดกดจุดเท้าเพื่อสุขภาพและบรรเทาอาการต่างๆ',
    },
    {
      key: '5',
      name: 'หลักสูตรการดูแลผิวหน้า',
      duration: '35 ชั่วโมง',
      description: 'เรียนรู้เทคนิคการดูแลผิวหน้าและการใช้ผลิตภัณฑ์ที่เหมาะสม',
    },
  ]);

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
      render: (_text: string, record: Course) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm"
          >
            แก้ไข
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key)}
            className="rounded-lg shadow-sm"
          >
            ลบ
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingCourse(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Course) => {
    setEditingCourse(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (keyToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลหลักสูตรนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        // *** แก้ไข: อัปเดต State โดยการกรองหลักสูตรที่ถูกลบออก ***
        setCourses(prevCourses => prevCourses.filter(course => course.key !== keyToDelete));
        message.success('ลบข้อมูลหลักสูตรสำเร็จ!');
      },
    });
  };

  const handleOk = () => {
    form.validateFields()
      .then((values: CourseFormValues) => {
        if (editingCourse) {
          // *** แก้ไข: อัปเดต State สำหรับการแก้ไขข้อมูล ***
          setCourses(prevCourses =>
            prevCourses.map(course =>
              course.key === editingCourse.key ? { ...course, ...values } : course
            )
          );
          message.success('อัปเดตข้อมูลหลักสูตรสำเร็จ!');
        } else {
          // *** แก้ไข: อัปเดต State สำหรับการเพิ่มข้อมูลใหม่ ***
          const newCourse: Course = {
            key: (courses.length + 1).toString(), // ควรสร้าง key จาก Backend จริงๆ
            ...values,
          };
          setCourses(prevCourses => [...prevCourses, newCourse]);
          message.success('เพิ่มข้อมูลหลักสูตรสำเร็จ!');
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">จัดการข้อมูลหลักสูตร</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        className="mb-6 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
      >
        เพิ่มหลักสูตรใหม่
      </Button>
      <Table
        columns={columns}
        // *** แก้ไข: ใช้ courses state เป็น dataSource ***
        dataSource={courses}
        className="rounded-xl shadow-custom-light"
        pagination={{ pageSize: 10 }}
        bordered={false}
      />

      <Modal
        title={editingCourse ? 'แก้ไขข้อมูลหลักสูตร' : 'เพิ่มหลักสูตรใหม่'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="rounded-xl"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="course_form"
          className="p-4"
        >
          <Form.Item
            name="name"
            label={<span className="font-semibold text-gray-700">ชื่อหลักสูตร</span>}
            rules={[{ required: true, message: 'กรุณากรอกชื่อหลักสูตร!' }]}
          >
            <Input placeholder="เช่น หลักสูตรนวดแผนไทย" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="duration"
            label={<span className="font-semibold text-gray-700">ระยะเวลา</span>}
            rules={[{ required: true, message: 'กรุณากรอกระยะเวลาหลักสูตร!' }]}
          >
            <Input placeholder="เช่น 40 ชั่วโมง" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="description"
            label={<span className="font-semibold text-gray-700">คำอธิบาย</span>}
            // *** แก้ไข: ลบ 'true' ที่ซ้ำซ้อนออกไป (ถ้ามี) ***
            // rules={[{ required: true, message: 'กรุณากรอกคำอธิบาย!' }]} // ตัวอย่างถ้าต้องการให้เป็น required
          >
            <Input.TextArea rows={4} placeholder="รายละเอียดเกี่ยวกับหลักสูตร" className="rounded-lg" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}