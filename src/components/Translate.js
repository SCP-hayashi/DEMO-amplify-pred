import { Predictions } from '@aws-amplify/predictions';
import '@aws-amplify/ui-react/styles.css';

import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';


import { useState } from 'react';
import language from '../lang.json';
import BasicSelect from './BasicSelect';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';


export const Translate = ()=>{
    const [text, setText] = useState("");
    const [sourceLang, setSource] = useState("ja");
    const [targetLang, setTarget] = useState("en");

    const [translated, setTranslated] = useState("");
    const onConversion = () => {
        console.log('prediction')

        Predictions.convert({
            translateText: {
              source: {
                text: text,
                language : sourceLang // defaults configured on aws-exports.js
                // supported languages https://docs.aws.amazon.com/translate/latest/dg/how-it-works.html#how-it-works-language-codes
              },
              targetLanguage: targetLang
            }
          })
          .then(result => {
              console.log({ result })
              setTranslated(result.text)
          })
          .catch(err => console.log({ err }));
    }

    const swapLang = () => {
        const temp = sourceLang

        setSource(targetLang)
        setTarget(temp)
    }

    return(
        <div>
            <h3>翻訳</h3>
            <Box sx={{ minWidth: 300 }}>
                <BasicSelect
                    sx={{ display: 'inline' }}
                    title={"原文"}
                    value={sourceLang}
                    values={language}
                    setValue={setSource}
                />
                <SwapHorizIcon onClick={swapLang}/>
                <BasicSelect
                    sx={{ display: 'inline' }}
                    title={"訳文"}
                    value={targetLang}
                    values={language}
                    setValue={setTarget}
                />
            </Box>
            <Box
                component="form"
                sx={{
                    m: 2,
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField
                    sx={{ display: 'inline' }}
                    id="tf"
                    multiline
                    rows={4}
                    margin="normal"
                    onChange={(e)=>setText(e.target.value)}
                />
                <TextField
                    sx={{ display: 'inline' }}
                    id="tf"
                    multiline
                    rows={4}
                    margin="normal"
                    defaultValue={translated}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Box>
            <Button disabled={text.length===0} onClick={onConversion}>Predict</Button>
        </div>
    )
}