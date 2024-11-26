import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebaseConfig';

export const fetchProducts = async () => {
    try {
        const fetchProductsCallable = httpsCallable(functions, 'fetchAllProducts');
        const result = await fetchProductsCallable({});
        console.log('Fetched products:', result.data);
        // if (result.data.success) {
        //     console.log('Fetched products:', result.data.data);
        // } else {
        //     console.error('Error fetching products:', result.data.message);
        // }
    } catch (error) {
        console.error('Error calling fetchProducts:', error);
        throw error;
    }
};
