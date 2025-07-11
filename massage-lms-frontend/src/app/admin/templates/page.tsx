'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react'; // Import useState
import { Upload, Button, message, Card, Col, Row, Typography, Modal, Input, Form, Select } from 'antd';
import { UploadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import Image from 'next/image'; // Import Image component

const { Text } = Typography;
const { Option } = Select;

interface Template {
  id: string;
  name: string;
  type: 'certificate' | 'report';
  preview: string;
  settings: {
    font: string;
    web: string;
  };
}

interface TemplateFormValues {
  name: string;
  type: 'certificate' | 'report';
  font: string;
  web: string;
}

export default function TemplatesPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [form] = Form.useForm<TemplateFormValues>();

  // *** แก้ไข: ใช้ useState เพื่อจัดการข้อมูลแม่แบบใน State ***
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'ใบประกาศมาตรฐาน',
      type: 'certificate',
      preview: 'https://placehold.co/300x200/FF0000/FFFFFF?text=Certificate+Template+1',
      settings: {
        font: 'Inter',
        web: 'default.com',
      }
    },
    {
      id: '2',
      name: 'แม่แบบรายงานประจำปี',
      type: 'report',
      preview: 'https://placehold.co/300x200/0000FF/FFFFFF?text=Report+Template+1',
      settings: {
        font: 'Arial',
        web: 'report.com',
      }
    },
    {
      id: '3',
      name: 'ใบประกาศเกียรติคุณพิเศษ',
      type: 'certificate',
      preview: 'https://placehold.co/300x200/008000/FFFFFF?text=Special+Certificate',
      settings: {
        font: 'Sarabun',
        web: 'premium.com',
      }
    },
    {
      id: '4',
      name: 'แม่แบบรายงานผลการเรียน',
      type: 'report',
      preview: 'https://placehold.co/300x200/FFA500/FFFFFF?text=Grade+Report',
      settings: {
        font: 'Kanit',
        web: 'grades.com',
      }
    },
  ]);

  const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: UploadChangeParam<UploadFile>) {
      if (info.file.status !== undefined) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      } else {
        console.warn('File status is undefined:', info.file);
      }
    },
  };

  const handleAdd = () => {
    setEditingTemplate(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    form.setFieldsValue({
      name: template.name,
      type: template.type,
      font: template.settings.font,
      web: template.settings.web,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (idToDelete: string) => { // เปลี่ยนชื่อ parameter
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบแม่แบบนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        // *** แก้ไข: อัปเดต State โดยการกรองแม่แบบที่ถูกลบออก ***
        setTemplates(prevTemplates => prevTemplates.filter(template => template.id !== idToDelete));
        message.success('ลบแม่แบบสำเร็จ!');
      },
    });
  };

  const handleOk = () => {
    form.validateFields()
      .then((values: TemplateFormValues) => {
        if (editingTemplate) {
          // *** แก้ไข: อัปเดต State สำหรับการแก้ไขข้อมูล ***
          setTemplates(prevTemplates =>
            prevTemplates.map(template =>
              template.id === editingTemplate.id ? { ...template, ...values, settings: { ...template.settings, font: values.font, web: values.web } } : template
            )
          );
          message.success('อัปเดตแม่แบบสำเร็จ!');
        } else {
          // *** แก้ไข: อัปเดต State สำหรับการเพิ่มข้อมูลใหม่ ***
          const newTemplate: Template = {
            id: (templates.length + 1).toString(), // ควรสร้าง ID จาก Backend จริงๆ
            ...values,
            preview: 'https://placehold.co/300x200/CCCCCC/000000?text=New+Template', // กำหนด placeholder
            settings: {
                font: values.font,
                web: values.web
            }
          };
          setTemplates(prevTemplates => [...prevTemplates, newTemplate]);
          message.success('เพิ่มแม่แบบสำเร็จ!');
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
      <h1 className="text-3xl font-bold mb-8 text-gray-800">จัดการแม่แบบเทมเพลต</h1>
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        <Upload {...props}>
          <Button icon={<UploadOutlined />} className="rounded-lg shadow-sm px-6 py-3 text-base">อัปโหลดตราโรงเรียน</Button>
        </Upload>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md px-6 py-3 text-base"
        >
          เพิ่มแม่แบบใหม่
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {/* *** แก้ไข: ใช้ templates state เป็น dataSource *** */}
        {templates.map(template => (
          <Col xs={24} sm={12} md={8} lg={6} key={template.id}>
            <Card
              hoverable
              cover={
                <Image
                  alt={template.name}
                  src={template.preview}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-t-xl"
                  unoptimized={true}
                />
              }
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit(template)} className="text-blue-500 hover:text-blue-700 text-xl" />,
                <DeleteOutlined key="delete" onClick={() => handleDelete(template.id)} className="text-red-500 hover:text-red-700 text-xl" />,
              ]}
              className="rounded-xl shadow-custom-light hover:shadow-custom-medium transition-shadow duration-300"
            >
              <Card.Meta
                title={<span className="font-semibold text-lg text-gray-800">{template.name}</span>}
                description={
                  <>
                    <Text type="secondary" className="text-sm text-gray-600">ประเภท: {template.type === 'certificate' ? 'ใบประกาศ' : 'รายงาน'}</Text><br />
                    <Text type="secondary" className="text-sm text-gray-600">ฟอนต์: {template.settings.font}</Text><br />
                    <Text type="secondary" className="text-sm text-gray-600">เว็บ: {template.settings.web}</Text>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={editingTemplate ? 'แก้ไขแม่แบบ' : 'เพิ่มแม่แบบใหม่'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="rounded-xl"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="template_form"
          className="p-4"
        >
          <Form.Item
            name="name"
            label={<span className="font-semibold text-gray-700">ชื่อแม่แบบ</span>}
            rules={[{ required: true, message: 'กรุณากรอกชื่อแม่แบบ!' }]}
          >
            <Input placeholder="เช่น ใบประกาศมาตรฐาน" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="type"
            label={<span className="font-semibold text-gray-700">ประเภทแม่แบบ</span>}
            rules={[{ required: true, message: 'กรุณาเลือกประเภทแม่แบบ!' }]}
          >
            <Select placeholder="เลือกประเภท" className="rounded-lg">
              <Option value="certificate">ใบประกาศ</Option>
              <Option value="report">รายงาน</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="font"
            label={<span className="font-semibold text-gray-700">รูปแบบตัวอักษร</span>}
            rules={[{ required: true, message: 'กรุณากำหนดรูปแบบตัวอักษร!' }]}
          >
            <Input placeholder="เช่น Inter, Arial, Sarabun" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="web"
            label={<span className="font-semibold text-gray-700">กำหนดเว็บ (URL)</span>}
            rules={[{ required: true, message: 'กรุณากำหนด URL เว็บ!' }]}
          >
            <Input placeholder="เช่น https://your-lms.com" className="rounded-lg" />
          </Form.Item>
          <Form.Item label={<span className="font-semibold text-gray-700">อัปโหลดไฟล์ (เช่น ตราโรงเรียน/ตัวอย่างแม่แบบ)</span>}>
            <Upload {...props} maxCount={1}>
              <Button icon={<UploadOutlined />} className="rounded-lg">เลือกไฟล์</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}