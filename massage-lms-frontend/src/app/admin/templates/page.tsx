// massage-lms-frontend/src/app/admin/templates/page.tsx
// หน้าสำหรับจัดการแม่แบบเทมเพลต (Client Component)
// ไม่ต้อง Import AdminLayout เพราะจะถูกห่อหุ้มโดย src/app/admin/layout.tsx โดยอัตโนมัติ

'use client'; // *** สำคัญมาก: ระบุว่าเป็น Client Component ***

import React from 'react';
import { Upload, Button, message, Card, Col, Row, Typography, Modal, Input, Form, Select } from 'antd';
import { UploadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

interface Template {
  id: string;
  name: string;
  type: 'certificate' | 'report'; // เพิ่ม type ของแม่แบบ
  preview: string; // URL สำหรับรูปภาพตัวอย่าง
  settings: {
    font: string;
    web: string;
  };
}

export default function TemplatesPage() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingTemplate, setEditingTemplate] = React.useState<Template | null>(null);
  const [form] = Form.useForm();

  // ข้อมูลแม่แบบจำลอง (Dummy Data)
  const dummyTemplates: Template[] = [
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
  ];

  // Props สำหรับ Ant Design Upload Component
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // Mock API endpoint สำหรับการอัปโหลด (คุณจะต้องเปลี่ยนเป็น API ของคุณเอง)
    headers: {
      authorization: 'authorization-text',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // ฟังก์ชันสำหรับเปิด Modal เพิ่มแม่แบบ
  const handleAdd = () => {
    setEditingTemplate(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // ฟังก์ชันสำหรับเปิด Modal แก้ไขแม่แบบ
  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    form.setFieldsValue({
      name: template.name,
      type: template.type, // ตั้งค่า type ด้วย
      font: template.settings.font,
      web: template.settings.web,
    });
    setIsModalVisible(true);
  };

  // ฟังก์ชันสำหรับลบแม่แบบ
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: 'คุณแน่ใจหรือไม่ว่าต้องการลบแม่แบบนี้?',
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        // *** Logic สำหรับลบข้อมูลจริง (คุณจะต้องเรียก API ไปยัง Backend ที่นี่) ***
        message.success('ลบแม่แบบสำเร็จ!');
      },
    });
  };

  // ฟังก์ชันเมื่อกดปุ่ม OK ใน Modal (เพิ่ม/แก้ไข)
  const handleOk = () => {
    form.validateFields()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(values => {
        if (editingTemplate) {
          // *** Logic สำหรับอัปเดตข้อมูลจริง (คุณจะต้องเรียก API ไปยัง Backend ที่นี่) ***
          message.success('อัปเดตแม่แบบสำเร็จ!');
        } else {
          // *** Logic สำหรับเพิ่มข้อมูลจริง (คุณจะต้องเรียก API ไปยัง Backend ที่นี่) ***
          message.success('เพิ่มแม่แบบสำเร็จ!');
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">จัดการแม่แบบเทมเพลต</h1>
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        {/* ปุ่มอัปโหลดตราโรงเรียน */}
        <Upload {...props}>
          <Button icon={<UploadOutlined />} className="rounded-md shadow-sm">อัปโหลดตราโรงเรียน</Button>
        </Upload>
        {/* ปุ่มเพิ่มแม่แบบใหม่ */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md"
        >
          เพิ่มแม่แบบใหม่
        </Button>
      </div>

      {/* แสดงรายการแม่แบบในรูปแบบ Card */}
      <Row gutter={[16, 16]}>
        {dummyTemplates.map(template => (
          <Col xs={24} sm={12} md={8} lg={6} key={template.id}>
            <Card
              hoverable
              cover={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={template.name}
                  src={template.preview}
                  // เพิ่ม onError เพื่อแสดงภาพ Placeholder หากโหลดภาพไม่ได้
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/300x200/CCCCCC/000000?text=No+Preview'; }}
                  className="w-full h-40 object-cover rounded-t-lg" // Tailwind class
                />
              }
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit(template)} className="text-blue-500 hover:text-blue-700" />,
                <DeleteOutlined key="delete" onClick={() => handleDelete(template.id)} className="text-red-500 hover:text-red-700" />,
              ]}
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" // Tailwind class
            >
              <Card.Meta
                title={<span className="font-semibold text-lg text-gray-800">{template.name}</span>}
                description={
                  <>
                    <Text type="secondary" className="text-sm">ประเภท: {template.type === 'certificate' ? 'ใบประกาศ' : 'รายงาน'}</Text><br />
                    <Text type="secondary" className="text-sm">ฟอนต์: {template.settings.font}</Text><br />
                    <Text type="secondary" className="text-sm">เว็บ: {template.settings.web}</Text>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal สำหรับเพิ่ม/แก้ไขแม่แบบ */}
      <Modal
        title={editingTemplate ? 'แก้ไขแม่แบบ' : 'เพิ่มแม่แบบใหม่'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="rounded-lg"
      >
        <Form
          form={form}
          layout="vertical"
          name="template_form"
          className="p-4"
        >
          <Form.Item
            name="name"
            label="ชื่อแม่แบบ"
            rules={[{ required: true, message: 'กรุณากรอกชื่อแม่แบบ!' }]}
          >
            <Input placeholder="เช่น ใบประกาศมาตรฐาน" className="rounded-md" />
          </Form.Item>
          <Form.Item
            name="type"
            label="ประเภทแม่แบบ"
            rules={[{ required: true, message: 'กรุณาเลือกประเภทแม่แบบ!' }]}
          >
            <Select placeholder="เลือกประเภท">
              <Option value="certificate">ใบประกาศ</Option>
              <Option value="report">รายงาน</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="font"
            label="รูปแบบตัวอักษร"
            rules={[{ required: true, message: 'กรุณากำหนดรูปแบบตัวอักษร!' }]}
          >
            <Input placeholder="เช่น Inter, Arial, Sarabun" className="rounded-md" />
          </Form.Item>
          <Form.Item
            name="web"
            label="กำหนดเว็บ (URL)"
            rules={[{ required: true, message: 'กรุณากำหนด URL เว็บ!' }]}
          >
            <Input placeholder="เช่น https://your-lms.com" className="rounded-md" />
          </Form.Item>
          {/* Form.Item สำหรับการอัปโหลดไฟล์ (ตราโรงเรียน/แม่แบบ) */}
          <Form.Item label="อัปโหลดไฟล์ (เช่น ตราโรงเรียน/ตัวอย่างแม่แบบ)">
            <Upload {...props} maxCount={1}>
              <Button icon={<UploadOutlined />} className="rounded-md">เลือกไฟล์</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
