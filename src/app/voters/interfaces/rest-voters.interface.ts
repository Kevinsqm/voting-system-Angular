export interface VotersResponse {
    content: Content[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface VoterResponse {
    id: number;
    id_card: number;
    name: string;
    email: string;
    has_voted: boolean;
}

export interface Content {
    id: number;
    id_card: number;
    name: string;
    email: string;
    has_voted: boolean;
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

export interface ExistsByIdCardResponse {
    exists: boolean;
}
