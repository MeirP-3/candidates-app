import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import CandidateDetails from './candidate-details';
import { CandidateService } from './candidate.service';
import CandidateList from './candidate-list';
import { CandidateView } from './candidate.types';
import { CircularProgress } from '@material-ui/core';

const Candidates = ({ setIsRootPage }: any) => {

    let { path } = useRouteMatch();

    const [candidates, setCandidates] = useState<CandidateView[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        CandidateService.fetchCandidates()
        .then(() => {
            setCandidates(CandidateService.candidates);
            setLoading(false);
        });
    }, []);

    const fetchCandidateById = (candidateId: string) => {
        return candidates.find(({id}) => id.toString() === candidateId);
    }

    return (
        loading ? <CircularProgress style={{position: 'fixed', top: '40vh', left: '50%'}} /> :

        <Switch>
            <Route exact path={path}>
                <CandidateList
                    candidates={candidates}
                    setIsRootPage={setIsRootPage}
                />
            </Route>
            <Route path={`${path}/:id`}>
                <CandidateDetails
                    setIsRootPage={setIsRootPage}
                    fetchById={fetchCandidateById}
                />
            </Route>
        </Switch>
    );
};

export default Candidates;