import {message} from "antd";
import {InventoryParsed} from "../types/InventoryParsed";
import {useState} from "react";
import {StepConfig} from "../types/MultiStepsLoading";
import {fetchProducts} from "../repositories/products";

export const useHome = () => {

    const [steps, setSteps] = useState<StepConfig[]>([]);

    const handleUploadSuccess = (parsedData: InventoryParsed[]) => {
        const newSteps: StepConfig[] = [
            {
                key: '1',
                loadingText: 'מחשב כמות ברקודים להעלאה',
                asyncFunction: async () => {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    const barcodeCount = parsedData.length;
                    return `כמות ברקודים: ${barcodeCount}`;
                },
                failureText: 'שגיאה בחישוב כמות ברקודים',
            },
            {
                key: '2',
                loadingText: 'טוען את כל המוצרים מהאתר',
                asyncFunction: async () => {
                    const res = await fetchProducts();
                    return 'המוצרים נטענו בהצלחה';
                },
                failureText: 'שגיאה בהעלאת המוצרים',
            }
        ];
        setSteps(newSteps);
        message.success('הקובץ נטען בהצלחה');
    };

    const handleUploadError = (error: any) => {
        message.error('שגיאה בהעלאת הקובץ');
        console.error(error);
    };

    const resetSteps = () => {
        setSteps([]);
    }

    return {
        handleUploadSuccess,
        handleUploadError,
        resetSteps,
        steps,
    };
}
