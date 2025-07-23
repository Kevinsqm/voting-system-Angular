export interface Voter {
    id: number;
    id_card: number;
    name: string;
    email: string;
    has_voted: boolean;
}

export interface CreateVoter {
    id_card: number;
    name: string;
    email: string;
}

export interface UpdateVoter {
    name: string;
    email: string;
}