import { Predictions } from '@aws-amplify/predictions';
import React, { useState } from "react";
import '@aws-amplify/ui-react/styles.css';
import BasicSelect from './BasicSelect';

const MicrophoneStream = require('microphone-stream').default;

export const Transcribe = () => {
  const [response, setResponse] = useState("録音開始を押して始めてください。録音停止を押すと録音が停止され転写が始まります。")
  const [language, setLanguage] = useState("en-US")
  const languages = 
  {
    "日本語": "ja-JP",
    "英語 (米)": "en-US",
    "英語 (豪)": "en-AU",
    "中国語": "zh-CN",
    "韓国語": "ko-KR"
  }
  function AudioRecorder(props) {
    const [recording, setRecording] = useState(false);
    const [micStream, setMicStream] = useState();
    const [audioBuffer] = useState(
      (function() {
        let buffer = [];
        function add(raw) {
          buffer = buffer.concat(...raw);
          return buffer;
        }
        function newBuffer() {
          console.log("resetting buffer");
          buffer = [];
        }
 
        return {
          reset: function() {
            newBuffer();
          },
          addData: function(raw) {
            return add(raw);
          },
          getData: function() {
            return buffer;
          }
        };
      })()
    );

    async function startRecording() {
      console.log('start recording');
      audioBuffer.reset();

      window.navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then((stream) => {
        const startMic = new MicrophoneStream();
        startMic.setStream(stream);
        startMic.on('data', (chunk) => {
          console.log('hihi')
          var raw = MicrophoneStream.toRaw(chunk);
          if (raw == null) {
            return;
          }
          audioBuffer.addData(raw);

        });
        console.log('hihi')
        setRecording(true);
        setMicStream(startMic);
      });
    }

    async function stopRecording() {
      console.log('stop recording');
      const { finishRecording } = props;

      micStream.stop();
      setMicStream(null);
      setRecording(false);

      const resultBuffer = audioBuffer.getData();

      if (typeof finishRecording === "function") {
        finishRecording(resultBuffer);
      }

    }

    return (
      <div className="audioRecorder">
        <div>
          {recording && <button onClick={stopRecording}>録音停止</button>}
          {!recording && <button onClick={startRecording}>録音開始</button>}
        </div>
      </div>
    );
  }

  function convertFromBuffer(bytes) {
    setResponse('書き写しています。。。');
    
    Predictions.convert({
      transcription: {
        source: {
          bytes
        },
        // language: "en-US", // other options are "en-GB", "fr-FR", "fr-CA", "es-US"
        language: language
      },
    }).then(({ transcription: { fullText } }) => setResponse(fullText))
      .catch(err => setResponse(JSON.stringify(err, null, 2)))
  }

  return (
    <div className="Text">
      <div>
        <h3>転写　音声からテキスト</h3>
        <BasicSelect title={"音声からテキスト"} values={languages} value={language} setValue={setLanguage}/>
        <AudioRecorder finishRecording={convertFromBuffer} />
        <p>{response}</p>
      </div>
    </div>
  );
}