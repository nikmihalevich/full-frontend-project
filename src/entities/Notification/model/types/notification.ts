import { User } from 'entities/User';

export interface Notification {
    id: string;
    title: string;
    description: string;
    userId: User;
    href?: string;
}
