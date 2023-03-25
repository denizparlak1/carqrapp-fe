// GeneratePdfApi.js

import {API_URLS} from "../api/BaseUrl";

const generatePdfApi = async (customer, count, role) => {
    const response = await fetch(API_URLS['generateBulkQr'], {
        method: 'POST',
        body: JSON.stringify({
            customer: customer,
            count: count,
            role: role
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
    }

    const responseData = await response.json();
    return responseData
};

export { generatePdfApi };
