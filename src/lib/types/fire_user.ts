export type FireUser = {
    fake: boolean;
    uid: string;
    email: string;
    verified: boolean;
    username: string;
    role: number;
    created_at?: number;
    updated_at?: number;
}