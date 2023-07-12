import React from 'react';
import { Form, Input, Button } from 'antd';

const ContactPage = () => {
  const onFinish = (values) => {
    console.log('Form submitted:', values);
    // You can add your logic here to handle the form submission
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Contact Us</h2>
      <Form onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter your name',
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email',
            },
            {
              type: 'email',
              message: 'Please enter a valid email',
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="subject"
          rules={[
            {
              required: true,
              message: 'Please enter the subject',
            },
          ]}
        >
          <Input placeholder="Subject" />
        </Form.Item>

        <Form.Item
          name="message"
          rules={[
            {
              required: true,
              message: 'Please enter your message',
            },
          ]}
        >
          <Input.TextArea placeholder="Message" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactPage;