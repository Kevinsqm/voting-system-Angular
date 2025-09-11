export interface Register {
    email: string;
    password: string;
    role_id: number;
}

export interface Login {
    email: string;
    password: string;
}

export interface UserInfo {
    token: string;
    userId: number;
    email: string;
    name: string;
    personalId: number;
    roles: string[];
}

export interface Token {
    token: string;
}

export interface IsTokenValid {
    valid: boolean;
}