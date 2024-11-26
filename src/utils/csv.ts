import { parse } from 'csv-parse/browser/esm';

export const readCSV = (data: any) => {
    return new Promise((resolve, reject) => {
        parse(
            data,
            {
                delimiter: ",",
                columns: true,
                trim: true,
            },
            (err, records) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // Process parsed records
                resolve(records);
            },
        );
    });
};
