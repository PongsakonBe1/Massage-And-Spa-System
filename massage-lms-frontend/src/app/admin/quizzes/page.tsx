'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Tag, Select, Typography } from 'antd'; // เพิ่ม Typography
import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography; // Destructure Text from Typography

interface Quiz {
  key: string;
  title: string;
  course: string;
  questions: number;
  status: 'ACTIVE' | 'INACTIVE';
  actions: string;
}

interface QuizFormValues {
  title: string;
  course: string;
  questions: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export default function QuizzesPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [form] = Form.useForm<QuizFormValues>();

  // *** เพิ่ม State สำหรับ Modal แสดงรายละเอียด ***
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingQuiz, setViewingQuiz] = useState<Quiz | null>(null);

  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      key: '1',
      title: 'แบบทดสอบนวดแผนไทยเบื้องต้น',
      course: 'นวดแผนไทยเบื้องต้น',
      questions: 10,
      status: 'ACTIVE',
      actions: '',
    },
    {
      key: '2',
      title: 'แบบทดสอบสปาเพื่อสุขภาพ',
      course: 'สปาเพื่อสุขภาพ',
      questions: 15,
      status: 'ACTIVE',
      actions: '',
    },
    {
      key: '3',
      title: 'แบบทดสอบอโรมาเธอราพี',
      course: 'อโรมาเธอราพี',
      questions: 8,
      status: 'INACTIVE',
      actions: '',
    },
  ]);

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (text: string) => parseInt(text),
      width: 50,
      className: 'text-gray-600',
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
      className: 'font-medium text-gray-900',
    },
    {
      title: 'COURSE',
      dataIndex: 'course',
      key: 'course',
      className: 'text-gray-700',
    },
    {
      title: 'QUESTIONS',
      dataIndex: 'questions',
      key: 'questions',
      className: 'text-gray-700',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'ACTIVE' | 'INACTIVE') => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'} className="rounded-full px-3 py-1 text-xs font-semibold">
          {status}
        </Tag>
      ),
      className: 'text-center',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_text: string, record: Quiz) => (
        <Space size="middle">
          {/* *** เพิ่มปุ่มดูรายละเอียด *** */}
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            className="text-gray-500 border-none shadow-none hover:bg-gray-50"
          />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} className="text-blue-500 border-none shadow-none hover:bg-blue-50" />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingQuiz(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Quiz) => {
    setEditingQuiz(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields()
      .then((values: QuizFormValues) => {
        if (editingQuiz) {
          setQuizzes(prevQuizzes =>
            prevQuizzes.map(quiz =>
              quiz.key === editingQuiz.key ? { ...quiz, ...values } : quiz
            )
          );
          message.success('อัปเดตข้อมูล Quiz สำเร็จ!');
        } else {
          const newQuiz: Quiz = {
            key: (quizzes.length + 1).toString(),
            ...values,
            actions: '',
          };
          setQuizzes(prevQuizzes => [...prevQuizzes, newQuiz]);
          message.success('เพิ่มข้อมูล Quiz สำเร็จ!');
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
  const handleView = (record: Quiz) => {
    setViewingQuiz(record);
    setIsDetailModalVisible(true);
  };

  // *** ฟังก์ชันสำหรับปิด Modal แสดงรายละเอียด ***
  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setViewingQuiz(null);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Quiz</h1>
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-80 rounded-lg shadow-sm table-search-input"
        />
        <Button
          type="primary"
          onClick={handleAdd}
          icon={<PlusOutlined />}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
        >
          เพิ่ม
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={quizzes}
        className="rounded-xl shadow-custom-light"
        pagination={{ pageSize: 10 }}
        bordered={false}
      />

      <Modal
        title={editingQuiz ? 'แก้ไขข้อมูล Quiz' : 'เพิ่ม Quiz ใหม่'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="rounded-xl"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="quiz_form"
          className="p-4"
        >
          <Form.Item
            name="title"
            label={<span className="font-semibold text-gray-700">ชื่อ Quiz</span>}
            rules={[{ required: true, message: 'กรุณากรอกชื่อ Quiz!' }]}
          >
            <Input placeholder="เช่น แบบทดสอบนวดแผนไทย" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="course"
            label={<span className="font-semibold text-gray-700">หลักสูตร</span>}
            rules={[{ required: true, message: 'กรุณากรอกหลักสูตร!' }]}
          >
            <Input placeholder="เช่น นวดแผนไทยเบื้องต้น" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="questions"
            label={<span className="font-semibold text-gray-700">จำนวนคำถาม</span>}
            rules={[{ required: true, message: 'กรุณากรอกจำนวนคำถาม!', type: 'number', transform: (value) => Number(value) || 0 }]}
          >
            <Input type="number" placeholder="เช่น 10" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="status"
            label={<span className="font-semibold text-gray-700">สถานะ</span>}
            rules={[{ required: true, message: 'กรุณาเลือกสถานะ!' }]}
          >
            <Select<QuizFormValues['status']> placeholder="เลือกสถานะ" className="rounded-lg">
              <Option value="ACTIVE">ACTIVE</Option>
              <Option value="INACTIVE">INACTIVE</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* *** Modal สำหรับแสดงรายละเอียด Quiz *** */}
      <Modal
        title="รายละเอียด Quiz"
        open={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        footer={null}
        className="rounded-xl"
        centered
      >
        {viewingQuiz ? (
          <div className="p-4">
            <p className="mb-2"><Text strong>ชื่อ Quiz:</Text> {viewingQuiz.title}</p>
            <p className="mb-2"><Text strong>หลักสูตร:</Text> {viewingQuiz.course}</p>
            <p className="mb-2"><Text strong>จำนวนคำถาม:</Text> {viewingQuiz.questions}</p>
            <p className="mb-2"><Text strong>สถานะ:</Text> <Tag color={viewingQuiz.status === 'ACTIVE' ? 'green' : 'red'}>{viewingQuiz.status}</Tag></p>
          </div>
        ) : (
          <p>ไม่พบข้อมูล</p>
        )}
      </Modal>
    </>
  );
}
