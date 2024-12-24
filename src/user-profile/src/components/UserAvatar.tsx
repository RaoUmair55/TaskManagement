Here are the contents for the file `/user-profile/user-profile/src/components/UserAvatar.tsx`:

import React from 'react';

interface UserAvatarProps {
    imageUrl: string;
    altText: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ imageUrl, altText }) => {
    return (
        <img src={imageUrl} alt={altText} className="user-avatar" />
    );
};

export default UserAvatar;