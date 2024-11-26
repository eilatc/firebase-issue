import React from 'react';
import { Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFileUpload } from '../hooks/useFileUpload';
import ErrorList from "./ErrorList";
import {InventoryParsed} from "../types/InventoryParsed";

interface FileUploadProps {
    onUploadSuccess: (parsedData: InventoryParsed[]) => void;
    onUploadError: (error: any) => void;
    onFileChange?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, onUploadError, onFileChange }) => {
    const { fileList, errors, handleChange, customRequest } = useFileUpload(onUploadSuccess, onUploadError, onFileChange);

    return (
        <div>
            <Upload
                customRequest={customRequest}
                fileList={fileList}
                onChange={handleChange}
                showUploadList={true}
            >
                <Button icon={<UploadOutlined />}>לחץ להעלאת קובץ</Button>
            </Upload>
            <ErrorList errors={errors} />
        </div>
    );
};

export default FileUpload;
