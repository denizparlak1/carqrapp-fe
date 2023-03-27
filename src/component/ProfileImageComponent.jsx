import React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {updateUserProfileApi} from "../hook/UserDataApi";

export const ProfileImageComponent = ({ url, mail,userId }) => {

    const handleProfileImageUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        updateUserProfileApi(userId, formData)
            .then(response => response.json())
            .then(() => {
                window.location.reload(); // reload the page after image is updated
            })
            .catch((error) => console.error(error));
    };



    return (
        <div>
            <label htmlFor="profile-image-input">
                <IconButton component="span">
                    <Avatar
                        alt={mail}
                        src={url}
                        sx={{ width: 100, height: 100 }}
                    />
                    <EditIcon sx={{ fontSize: 'inherit' }} />
                </IconButton>
            </label>
            <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleProfileImageUpload}
            />
        </div>
    );
}
