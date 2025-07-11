'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Typography } from 'antd'; // เพิ่ม Typography
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons'; // เพิ่ม EyeOutlined

const { Text } = Typography; // Destructure Text from Typography

// กำหนด Type สำหรับข้อมูลโรงเรียน
interface School {
  key: string;
  name: string;
  address: string;
  contact: string;
}

// กำหนด Type สำหรับข้อมูล Form ของโรงเรียน
interface SchoolFormValues {
  name: string;
  address: string;
  contact: string;
}

export default function SchoolsPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [form] = Form.useForm<SchoolFormValues>();

  // *** เพิ่ม State สำหรับ Modal แสดงรายละเอียด ***
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingSchool, setViewingSchool] = useState<School | null>(null);

  const [schools, setSchools] = useState<School[]>([
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
    {
      key: '5',
      name: 'โรงเรียนสตรีวิทยา',
      address: 'กรุงเทพมหานคร',
      contact: '02-333-4444',
    },
    {
      key: '6',
      name: 'โรงเรียนหอวัง',
      address: 'กรุงเทพมหานคร',
      contact: '02-555-6666',
    },
  ]);

  // กำหนด Columns สำหรับตาราง Ant Design
  const columns = [
    {
      title: 'ชื่อโรงเรียน',
      dataIndex: 'name',
      key: 'name',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
      key: 'address',
      className: 'text-gray-700',
    },
    {
      title: 'เบอร์ติดต่อ',
      dataIndex: 'contact',
      key: 'contact',
      className: 'text-gray-700',
    },
    {
      title: 'การกระทำ',
      key: 'action',
      render: (_text: string, record: School) => (
        <Space size="middle">
          {/* *** เพิ่มปุ่มดูรายละเอียด *** */}
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
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
    setEditingSchool(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: School) => {
    setEditingSchool(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (keyToDelete: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลโรงเรียนนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        setSchools(prevSchools => prevSchools.filter(school => school.key !== keyToDelete));
        message.success('ลบข้อมูลโรงเรียนสำเร็จ!');
      },
    });
  };

  const handleOk = () => {
    form.validateFields()
      .then((values: SchoolFormValues) => {
        if (editingSchool) {
          setSchools(prevSchools =>
            prevSchools.map(school =>
              school.key === editingSchool.key ? { ...school, ...values } : school
            )
          );
          message.success('อัปเดตข้อมูลโรงเรียนสำเร็จ!');
        } else {
          const newSchool: School = {
            key: (schools.length + 1).toString(),
            ...values,
          };
          setSchools(prevSchools => [...prevSchools, newSchool]);
          message.success('เพิ่มข้อมูลโรงเรียนสำเร็จ!');
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

  // *** ฟังก์ชันสำหรับเปิด Modal แสดงรายละเอียด ***
  const handleView = (record: School) => {
    setViewingSchool(record);
    setIsDetailModalVisible(true);
  };

  // *** ฟังก์ชันสำหรับปิด Modal แสดงรายละเอียด ***
  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setViewingSchool(null); // ล้างข้อมูลที่กำลังดู
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">จัดการข้อมูลโรงเรียน</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        className="mb-6 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
      >
        เพิ่มโรงเรียนใหม่
      </Button>
      <Table
        columns={columns}
        dataSource={schools}
        className="rounded-xl shadow-custom-light"
        pagination={{ pageSize: 10 }}
        bordered={false}
      />

      <Modal
        title={editingSchool ? 'แก้ไขข้อมูลโรงเรียน' : 'เพิ่มโรงเรียนใหม่'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="rounded-xl"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="school_form"
          className="p-4"
        >
          <Form.Item
            name="name"
            label={<span className="font-semibold text-gray-700">ชื่อโรงเรียน</span>}
            rules={[{ required: true, message: 'กรุณากรอกชื่อโรงเรียน!' }]}
          >
            <Input placeholder="เช่น โรงเรียนสาธิต ม.เกษตรศาสตร์" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="address"
            label={<span className="font-semibold text-gray-700">ที่อยู่</span>}
            rules={[{ required: true, message: 'กรุณากรอกที่อยู่!' }]}
          >
            <Input placeholder="เช่น กรุงเทพมหานคร" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="contact"
            label={<span className="font-semibold text-gray-700">เบอร์ติดต่อ</span>}
            rules={[{ required: true, message: 'กรุณากรอกเบอร์ติดต่อ!' }]}
          >
            <Input placeholder="เช่น 02-123-4567" className="rounded-lg" />
          </Form.Item>
        </Form>
      </Modal>

      {/* *** Modal สำหรับแสดงรายละเอียดโรงเรียน *** */}
      <Modal
        title="รายละเอียดโรงเรียน"
        open={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        footer={null} // ไม่มีปุ่ม footer
        className="rounded-xl"
        centered
      >
        {viewingSchool ? (
          <div className="p-4">
            <p className="mb-2"><Text strong>ชื่อโรงเรียน:</Text> {viewingSchool.name}</p>
            <p className="mb-2"><Text strong>ที่อยู่:</Text> {viewingSchool.address}</p>
            <p className="mb-2"><Text strong>เบอร์ติดต่อ:</Text> {viewingSchool.contact}</p>
          </div>
        ) : (
          <p>ไม่พบข้อมูล</p>
        )}
      </Modal>
    </>
  );
}
