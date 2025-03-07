import { Button, Form, Input, InputNumber, notification, Radio } from 'antd';

import { collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAddDoc } from '../hooks/useAddDoc';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

const validateMessages = {
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number',
  },
};

export const NewCampaign: React.FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      description: "Can't create the campaign. Please try again",
      message: 'Failed to create campaign',
      placement,
    });
  };

  const submitForm = async (form: any) => {
  }

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        onFinish={submitForm}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Objective"
          name="objective"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="traffic">Traffic</Radio>
            <Radio value="action">Action</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input maxLength={150} showCount />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Budget"
          name="budget"
          rules={[{ required: true }, { max: 10000, min: 10, type: 'number' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
