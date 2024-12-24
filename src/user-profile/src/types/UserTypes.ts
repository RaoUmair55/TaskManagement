export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    bio?: string; // Optional property for user biography
}