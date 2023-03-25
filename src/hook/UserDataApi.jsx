import {API_URLS} from "../api/BaseUrl";

const getUserDataApi = async (userId) => {
    const response = await fetch(API_URLS['getUserData']+`${userId}`);
    return response;
};


const updateUserEmailApi = async (userId,email) => {
    const response = await fetch(API_URLS['updateUserEmail'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            email: email
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserMessageApi = async (userId,message) => {
    const response = await fetch(API_URLS['updateUserMessage'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            message: message
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserPlateApi = async (userId,plate) => {
    const response = await fetch(API_URLS['updateUserPlate'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            plate: plate
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserPhoneApi = async (userId,phone) => {
    const response = await fetch(API_URLS['updateUserPhone'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            phone: phone
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserProfileApi = async (userId, file) => {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(API_URLS['updatePhoto'] + userId, {
        method: 'PUT',
        body: formData,
    });

    return response;
};

export { getUserDataApi,updateUserEmailApi,updateUserMessageApi,updateUserPlateApi,updateUserPhoneApi,updateUserProfileApi };