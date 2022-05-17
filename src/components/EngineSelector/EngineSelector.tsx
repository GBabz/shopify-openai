import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';

const useStyles = makeStyles({
    formControl: {
        width: 300,
        backdropFilter: "blur(6px)",
    }
})

interface Props {
    currentEngine: string,
    setCurrentEngine: React.Dispatch<React.SetStateAction<string>>
}

export default function EngineSelector(props: Props) {
    const classes = useStyles()
    const [engineOptions, setEngineOptions] = React.useState<string[]>([])

    React.useEffect(() => {
        fetchEngines()
    }, [])

    const handleChange = (e: SelectChangeEvent) => {
        props.setCurrentEngine(e.target.value);
    }

    const fetchEngines = () => {
        fetch("https://api.openai.com/v1/engines", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                const engines = data.data.map((o: any) => o.id)
                setEngineOptions(engines)
            })
    }

    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Engine</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.currentEngine}
                    label="Engine"
                    onChange={handleChange}
                >
                    {engineOptions.map(engineOption => (<MenuItem key={engineOption} value={engineOption}>{engineOption}</MenuItem>))}
                </Select>
            </FormControl>
        </>
    )
}