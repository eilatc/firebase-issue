import React from 'react';
import { Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ErrorListProps {
    errors: string[];
}

const ErrorList: React.FC<ErrorListProps> = ({ errors }) => {
    if (errors.length === 0) return null;

    return (
        <div style={{marginTop: '20px'}}>
            <Title level={4} style={{ color: 'rgba(0, 0, 0, 0.75)' }}>שגיאות בקובץ</Title>
            {errors.map((error, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <CloseCircleOutlined style={{ color: 'red', marginLeft: '8px' }} />
                    <Text type="danger" style={{ color: 'rgba(0, 0, 0, 0.75)' }}>
                        {error}
                    </Text>
                </div>
            ))}
        </div>
    );
};

export default ErrorList;
