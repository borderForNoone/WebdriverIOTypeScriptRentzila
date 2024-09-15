import axios from 'axios';

let adminAccessToken: string | null = null;

export async function createAdminAccessToken() {
    const url = 'https://dev.rentzila.com.ua/api/auth/jwt/create/';
    
    const credentials = {
        email: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD
    };

    try {
        const response = await axios.post(url, credentials);

        adminAccessToken = response.data.access; 
        return adminAccessToken;
    } catch (error) {
        return error;
    }
}

export async function getListOfBackcalles() {
    const url = 'https://dev.rentzila.com.ua/api/backcall/';

    if (!adminAccessToken) {
        await createAdminAccessToken();
    }

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${adminAccessToken}` 
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching backcall list:', error);
        throw error;
    }
}