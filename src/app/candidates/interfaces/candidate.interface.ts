export interface Candidate {
    id: number;
    id_card: number;
    name: string;
    email: string;
    party: string;
    votes: number;
}

export interface CreateCandidate {
    id_card: number;
    name: string;
    party: string
}

export interface UpdateCandidate {
    name: string;
    party: string;
}