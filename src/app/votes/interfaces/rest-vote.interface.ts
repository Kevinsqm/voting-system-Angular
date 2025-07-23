export interface VoteResponse {
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    size: number;
    content: Content[];
    number: number;
    sort: Sort;
    pageable: Pageable;
    empty: boolean;
}

export interface Content {
    id: number;
    voter: VoterOrCandidate;
    candidate: VoterOrCandidate;
}

export interface VoterOrCandidate {
    id: number;
    name: string;
}

export interface Pageable {
    offset: number;
    sort: Sort;
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}
