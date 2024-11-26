import { useState } from 'react';
import { readCSV } from '../utils/csv';
import {InventoryParsed} from "../types/InventoryParsed";

export const useCSVValidation = () => {
    const [errors, setErrors] = useState<string[]>([]);

    // Validate file before upload
    const validateFile = async (file: File): Promise<{isValid: boolean, parsedData: InventoryParsed[]}> => {
        const isCSV = file.type === 'text/csv';
        const isLessThan2MB = file.size <= 2 * 1024 * 1024; // Limit file size to 2MB
        const validationErrors: string[] = [];
        let parsedData: InventoryParsed[] = [];

        if (!isCSV) {
            validationErrors.push('בבקשה להשתמש בקובץ מסוג CSV בלבד.');
        }

        if (!isLessThan2MB) {
            validationErrors.push('בבקשה להשתמש בקבצים בגודל של עד 2MB.');
        }

        if (isCSV && isLessThan2MB) {
            try {
                const res = await validateCSVHeaders(file);
                parsedData = res.parsedData;
            } catch (headerErrors: any) {
                validationErrors.push(...headerErrors);
            }
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            throw new Error('Validation failed');
        }

        return {
            isValid: validationErrors.length === 0,
            parsedData
        }
    };

    const validateCSVHeaders = async (file: File): Promise<{ parsedData: InventoryParsed[] }> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.onload = async (event) => {
                const csvContent = event.target?.result as string;
                const parsedData: any = await readCSV(csvContent);
                const headers = Object.keys(parsedData[0] || {});
                const headerErrors: string[] = [];

                if (headers.length !== 2) {
                    headerErrors.push('מספר העמודות חייב להיות שתיים בדיוק');
                }

                if (!headers.includes('BARCODE')) {
                    headerErrors.push('חסר עמודה של "BARCODE"');
                }

                if (!headers.includes('QUANTITY')) {
                    headerErrors.push('חסר עמודה של "QUANTITY"');
                }

                if (headerErrors.length > 0) {
                    reject(headerErrors);
                    return;
                }

                resolve({parsedData});
            };

            fileReader.onerror = (error) => {
                reject(error);
            };

            fileReader.readAsText(file);
        });
    };

    return { errors, validateFile, setErrors };
};
