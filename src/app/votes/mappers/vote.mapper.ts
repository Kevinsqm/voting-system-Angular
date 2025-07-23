import { Content } from "../interfaces/rest-vote.interface";
import { Vote } from "../interfaces/vote.interface";

export class VoteMapper {

    static contentToVote(content: Content): Vote {
        return {
            id: content.id,
            voter: content.voter,
            candidate: content.candidate
        }
    }

    static contentArrayToVoteArray(contentArr: Content[]) {
        return contentArr.map(c => this.contentToVote(c));
    }

}