import  { Predictions } from '@aws-amplify/predictions';
import '@aws-amplify/ui-react/styles.css';
import { Button, TextField, Box } from '@mui/material';
import { useState } from 'react';
import { LongOutputContainer } from './LongOutputContainer';

export const TextInterpretation = () => {
    const [response, setResponse] = useState("文章を書いて試してみよう")
    const [textToInterpret, setTextToInterpret] = useState("解釈したいテキスト");
  
    function interpretFromPredictions() {
        setResponse("検索中...")
        Predictions.interpret({
            text: {
            source: {
                text: textToInterpret,
            },
            type: "ALL"
            }
        })
        .then(result => setResponse(JSON.stringify(result, null, 2)))
        .catch(err => setResponse(JSON.stringify(err, null, 2)))
    }
  
    function setText(event) {
      setTextToInterpret(event.target.value);
    }
  
    return (
      <div>
        <h3>テキスト解釈</h3>
        <Box>
        <TextField
          multiline
          rows={4}
          value={textToInterpret} 
          onChange={setText}/>
        </Box>
        <Button onClick={interpretFromPredictions}>テスト</Button>
        <LongOutputContainer result={response}/>
      </div>
    );
  }