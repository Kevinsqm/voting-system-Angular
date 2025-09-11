import { Candidate } from "../interfaces/candidate.interface";
import { Content } from "../interfaces/rest-candidates.interface";

export class CandidateMapper {

    static toCandidate(content: Content): Candidate {
        return {
            id: content.id,
            id_card: content.id_card,
            name: content.name,
            email: content.email,
            party: content.party,
            votes: content.votes,
            photoUrl: content.photoUrl
        }
    }

    static toCandidatesArray(contentArray: Content[]): Candidate[] {
        return contentArray.map(content => this.toCandidate(content));
    }
}