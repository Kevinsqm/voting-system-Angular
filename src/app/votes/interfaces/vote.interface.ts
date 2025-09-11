// import { VoterOrCandidate } from "./rest-vote.interface";

// export interface Vote {
//     id: number;
//     voter: VoterOrCandidate;
//     candidate: VoterOrCandidate;
// }

export interface CreateVote {
    voter_id: number;
    candidate_id: number;
}