import { useState } from 'react';
import { message } from 'antd';
import { useCSVValidation } from './useCSVValidation';
import {InventoryParsed} from "../types/InventoryParsed";

export const useFileUpload = (onUploadSuccess: (parsedData : InventoryParsed[]) => void, onUploadError: (error: any) => void, onFileChange?: () => void) => {
    const { errors, validateFile, setErrors } = useCSVValidation();
    const [fileList, setFileList] = useState<any[]>([]);

    const handleChange = (info: any) => {
        console.log('handleChange', info);
        if (info.file.status === 'uploading') {
            if (onFileChange) {
                onFileChange();
            }
            setErrors([]);
        }
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-1); // Allow only 1 file to be uploaded
        setFileList(newFileList);
    };

    const customRequest = async ({ file, onSuccess, onError }: any) => {
        console.log('customRequest');
        try {
            console.log('Uploading file:', file);
            // Validate the file and get the parsed data
            const {parsedData} = await validateFile(file); // Perform validation and get parsed data
            onUploadSuccess(parsedData);
            onSuccess();
        } catch (error) {
            message.error('שגיאה בהעלאת הקובץ');
            onError(error);
            onUploadError(error);
        }
    };


    return {
        fileList,
        errors,
        handleChange,
        customRequest,
    };
};
