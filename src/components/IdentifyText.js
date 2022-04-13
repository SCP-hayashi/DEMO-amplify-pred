import { Predictions} from '@aws-amplify/predictions';
import '@aws-amplify/ui-react/styles.css';
import { Button } from '@mui/material';
import { useState } from 'react';

import BasicSelect from './BasicSelect';
import { Uploader } from './Uploader';
import { LongOutputContainer } from './LongOutputContainer';

export const IdentifyText= ()=>{
    const [file, setFile] = useState(undefined);
    const [type, setType] = useState('');
    const [result, setResult] = useState(undefined);

    const onFileChanged = (e) => {
        setFile(e.target.files[0])
    }

    const onPrediction = () => {
        Predictions.identify({
            text: {
                source: {
                    file
                },
                format: "ALL", 
            }
        })
        .then(response => {
            // const {
            //     text: { 
            //         // same as PLAIN + FORM + TABLE
            //     }    
            // } = response
            console.log(response)
            setResult(JSON.stringify(response))
        })
        .catch(err => console.log({ err }));
    }

    return(
        <div>
            <h3>写真から文字を検出する</h3>

                <Uploader file={file} onFileChanged={onFileChanged}/>

                <BasicSelect title={"ファイルタイプ"} 
                    values={{
                        "普通の書類": "PLAIN",
                        "フォーム": "FORM",
                        "テーブル": "TABLE"
                    }}
                    value={type}
                    setValue={setType}
                />
        
            <Button 
                variant="contained"
                component="label"
                onClick={onPrediction}
                disabled={!file || !type}
                >検出する</Button>

            <LongOutputContainer result={result}/>
        </div>
        
    )
}