import  { Predictions } from '@aws-amplify/predictions';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import { Uploader } from './Uploader';
import { LongOutputContainer } from './LongOutputContainer';

export const LabelsIdentification = () => {
    const [response, setResponse] = useState("画像をアップロードして試してみよう")
    const [dummy, setDummy] = useState(null);
    function identifyFromFile(event) {
        const { target: { files } } = event;
        const [file,] = files || [];
        if (!file) {
            return;
        }
        setResponse("検索中...")
        setDummy(file)
        Predictions.identify({
            labels: {
            source: {
                file,
            },
            type: "ALL" // "LABELS" will detect objects , "UNSAFE" will detect if content is not safe, "ALL" will do both default on aws-exports.js
            }
        }).then(result => setResponse(JSON.stringify(result, null, 2)))
            .catch(err => setResponse(JSON.stringify(err, null, 2)))
    }
  
    return (
      <div className="Text">
        <div>
          <h3>ラベル検出</h3>
          {/* <input type="file" onChange={identifyFromFile}></input> */}
          <Uploader 
            file={dummy}
            onFileChanged={identifyFromFile}
            />
          <LongOutputContainer result={response}/>
        </div>
      </div>
    );
  }