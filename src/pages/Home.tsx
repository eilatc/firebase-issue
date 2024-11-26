import React from 'react';
import {message, Typography} from 'antd';
import FileUpload from "../components/FileUpload";
import {useHome} from "../hooks/useHome";
import MultiStepLoading from "../components/MultiStepLoading";
const { Title } = Typography;

export const Home = () => {
    const {handleUploadSuccess, handleUploadError, steps, resetSteps} = useHome();

    return (
        <div>
            <Title level={3}>העלאת קובץ מלאי</Title>
            <FileUpload onUploadSuccess={handleUploadSuccess} onUploadError={handleUploadError} onFileChange={resetSteps} />
            {steps.length > 0 && <MultiStepLoading steps={steps} />}
        </div>
    );
};
