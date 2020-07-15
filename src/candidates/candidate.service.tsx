import { Candidate, CandidateView } from './candidate.types';
import { HttpApiService } from '../http/http.service';
import { HttpEndPoint } from '../http/http.config';


export class CandidateService {

    static candidates: CandidateView[];

    static populateCandidates(candidates: Candidate[]) {
        this.candidates = candidates.map(({first_name, last_name, job_description, ...rest}) => ({
            first_name,
            last_name,
            fullName: `${first_name} ${last_name}`,
            job_description: job_description.replace(/\\/g, ''),
            ...rest
        }));
    }

    static async fetchCandidates() {

        if (this.candidates) {
            return;
        }

        return HttpApiService.get
            <any, { success: string, candidates: Candidate[] }>
            (HttpEndPoint.candidates)
            .then(({ candidates }) => candidates)
            .then(this.populateCandidates.bind(this));
    }
}
