import React from 'react';
import { User } from '../types/UserTypes';
import './UserProfile.css';

interface UserProfileProps {
    user: User;
    onEdit: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit }) => {
    return (
        <div className="user-profile">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Bio: {user.bio}</p>
            <button onClick={onEdit}>Edit Profile</button>
        </div>
    );
};

export default UserProfile;