import { Content } from "../interfaces/rest-voters.interface";
import { Voter } from "../interfaces/voter.interface";

export class VoterMapper {

    static contentToVoter(content: Content): Voter {
        return {
            id: content.id,
            id_card: content.id_card,
            name: content.name,
            email: content.email,
            has_voted: content.has_voted
        };
    }

    static contentArrayToVoterArray(contentArr: Content[]) {
        return contentArr.map(c => this.contentToVoter(c))
    }
}