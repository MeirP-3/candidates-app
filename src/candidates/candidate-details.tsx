import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { CandidateDetailsProps, CandidateView } from './candidate.types';
import { makeStyles, Card, CardHeader, Avatar, CardContent, Typography } from '@material-ui/core';

const useStiles = makeStyles(theme => ({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '100vw',
        maxWidth: '800px'
    },
    content: {
        paddingLeft: theme.spacing(3),
    },
    strong: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        marginInlineEnd: '1em'
    }
}));

export default function CandidateDetails({ setIsRootPage, fetchById }: CandidateDetailsProps) {
    
    const classes = useStiles();

    const { id } = useParams();
    
    useEffect(() => {
        setIsRootPage(false);
    }, []);

    const [candidate] = useState(fetchById(id));

    const { avatar, fullName, job_title, job_description, gender }: CandidateView = (candidate || {}) as CandidateView;

    return (
        candidate ?

        <div className={classes.main}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Avatar" src={avatar}/>
                    }
                    title={fullName}
                    subheader={job_title}
                />
                <CardContent className={classes.content}>
                    <Typography variant="h4">{fullName}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{gender}</Typography>
                    <Typography variant="h5">{job_title}</Typography>
                    <Typography variant="body2">{job_description}</Typography>
                </CardContent>
            </Card>
        </div>

        :

        <Redirect to="../" />
    )
};