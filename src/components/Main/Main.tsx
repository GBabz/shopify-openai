import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import CustomParticles from '../CustomParticles/CustomParticles';
import EngineSelector from '../EngineSelector/EngineSelector';
import Form, { LOCAL_STORAGE_RESULTS_KEY } from '../Form/Form';
import ResultList from '../ResultList/ResultList';

const useStyles = makeStyles({
    container: {
        position: "relative",
        zIndex: 0,
        padding: "0 30rem",
        overflowX: "hidden",
        "@media (max-width:1400px)": {
            padding: "0 10rem",
        },
        "@media (max-width:800px)": {
            padding: "0 5rem",
        },
        "@media (max-width:600px)": {
            padding: "0 1rem",
        },
    },
    header: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: "20px 0"
    },
})

export interface AugmentedResult {
    prompt: string,
    result: {
        text: string,
        createdAt: number
    }
}

export default function Main() {
    const classes = useStyles()
    const [augmentedResults, setAugmentedResults] = React.useState<AugmentedResult[]>([])
    const [currentEngine, setCurrentEngine] = React.useState<string>("text-curie-001")

    //Retrieves the augmentedResults stored in the local storage and update the state
    React.useEffect(() => {
        const localStorageResults = JSON.parse(localStorage.getItem(LOCAL_STORAGE_RESULTS_KEY) || '[]')
        setAugmentedResults(localStorageResults)
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography variant="h4" style={{ marginBottom: 10 }}>OpenAi form 🚀</Typography>
                <EngineSelector currentEngine={currentEngine} setCurrentEngine={setCurrentEngine} />
            </div>
            <Form currentEngine={currentEngine} augmentedResults={augmentedResults} setAugmentedResults={setAugmentedResults} />
            <ResultList augmentedResults={augmentedResults} />
            <CustomParticles />
        </div>

    )
}