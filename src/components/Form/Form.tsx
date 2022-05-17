import { Button, FormControl, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { AugmentedResult } from '../Main/Main';

export const LOCAL_STORAGE_RESULTS_KEY = "augmentedResults"

const useStyles = makeStyles({
    controls: {
        display: "flex",
        justifyContent: "center",
        marginTop: "1rem"
    },
    controlButton: {
        width: 200,
        margin: "20px"
    },
    formControl: {
        backdropFilter: "blur(6px)"
    }
})

interface Props {
    augmentedResults: AugmentedResult[],
    setAugmentedResults: React.Dispatch<React.SetStateAction<AugmentedResult[]>>
    currentEngine: string,
}

export default function Form(props: Props) {
    const classes = useStyles()
    const [prompt, setPrompt] = React.useState<string>("")

    const requestBody = {
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        n: 1, // limiting amount of completions to ensure we don't bust token quota
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    }

    const fetchCompletion = () => {
        fetch(`https://api.openai.com/v1/engines/${props.currentEngine}/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => {
                const newAugmentedResults = [{ prompt: prompt, result: { text: data.choices[0].text, createdAt: data.created } }, ...props.augmentedResults]
                props.setAugmentedResults(newAugmentedResults)
                //saves the result into the localStorage in order to load it back later
                localStorage.setItem(LOCAL_STORAGE_RESULTS_KEY, JSON.stringify(newAugmentedResults))
                setPrompt("")
            })
    }

    const clearList = () => {
        props.setAugmentedResults([])
        localStorage.removeItem(LOCAL_STORAGE_RESULTS_KEY)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        fetchCompletion()
        e.preventDefault()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl className={classes.formControl} style={{ width: "100%" }}>
                <TextField id="prompt" variant="outlined" value={prompt} onChange={handleChange} placeholder="Please type your prompt here 👈" multiline rows={5} />
            </FormControl>
            <div className={classes.controls}>
                <Button className={classes.controlButton} style={{ marginRight: 10 }} disabled={prompt.trim().length < 1 || !props.currentEngine} variant="contained" color="primary" type="submit">
                    Submit ✈️
                </Button>
                <Button className={classes.controlButton} onClick={clearList} disabled={!props.augmentedResults || props.augmentedResults.length === 0} variant="contained" color="primary">
                    Clear list ❌
                </Button>
            </div>
        </form>
    )

}