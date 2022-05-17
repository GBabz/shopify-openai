import { Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { AugmentedResult } from '../Main/Main';

const useStyles = makeStyles({
    card: {
        marginTop: "1rem",
        marginBottom: "1rem",
    }
})

interface Props {
    augmentedResults: AugmentedResult[]
}

export default function ResultList(props: Props) {
    const classes = useStyles()

    return (
        <>
            {props.augmentedResults.map((augmentedResult, index) => (
                <Card key={`result-${index}`} className={classes.card}>
                    <CardContent>
                        <Typography variant="h6">Prompt:</Typography>
                        <Typography>{augmentedResult.prompt}</Typography>
                        <Typography variant="h6">Result:</Typography>
                        <Typography>{augmentedResult.result.text}</Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}