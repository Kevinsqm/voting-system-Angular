export interface VoteResponse {
    content: Content[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface Content {
    id: number;
    voter: Voter;
    candidate: Candidate;
}

export interface Candidate {
    id: number;
    name: string;
    email: string;
    photoUrl: string;
}

export interface Voter {
    id: number;
    name: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface VoteStatisticsResponse {
    statistics_per_Candidate: StatisticsPerCandidate[];
    voters_Who_Have_Voted: number;
}

export interface StatisticsPerCandidate {
    candidate: string;
    party: string;
    photoUrl: string;
    total_votes: number;
    percentage_of_votes: number;
}