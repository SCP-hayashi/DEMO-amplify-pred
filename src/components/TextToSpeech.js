import  { Predictions } from '@aws-amplify/predictions';
import '@aws-amplify/ui-react/styles.css';
import { Button, TextField, Box } from '@mui/material';
import { useState } from 'react';

import BasicSelect from './BasicSelect';

export function TextToSpeech() {

    const [response, setResponse] = useState("...")
    const [textToGenerateSpeech, setTextToGenerateSpeech] = useState("write to speech");
    const [voiceId, setVoiceId] = useState("Takumi")
  
    function generateTextToSpeech() {
        console.log(voiceId)
      setResponse('音声作成中...');
      Predictions.convert({
        textToSpeech: {
          source: {
            text: textToGenerateSpeech,
          },
          voiceId
          // voiceId: "Amy" // default configured on aws-exports.js 
          // list of different options are here https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
        }
      }).then(result => {
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        console.log({ AudioContext });
        const audioCtx = new AudioContext(); 
        const source = audioCtx.createBufferSource();
        audioCtx.decodeAudioData(result.audioStream, (buffer) => {
  
          source.buffer = buffer;
          source.connect(audioCtx.destination);
          source.start(0);
        }, (err) => console.log({err}));
        
        setResponse(`音声作成完了`);
      })
        .catch(err => setResponse(err))
    }
  
    function setText(event) {
      setTextToGenerateSpeech(event.target.value);
    }
  
    return (
      <div className="Text">
        <div>
          <h3>テキスト→音声</h3>
          <Box>
            <BasicSelect
              title={"対応言語"}
              values={{
                  "日本語": "Takumi",
                  "英語（オーストラリア）": "Russell",
                  "英語（イギリス）": "Amy",
                  "英語 （アメリカ）": "Justin",
              }}
              value={voiceId}
              setValue={setVoiceId}
            />
            <TextField 
              multiline
              rows={4}
              value={textToGenerateSpeech} 
              onChange={setText}></TextField>
          </Box>
          <Button onClick={generateTextToSpeech}>作成</Button>
          <h3>{response}</h3>
        </div>
      </div>
    );
}