import  { Predictions } from '@aws-amplify/predictions';
import { Storage } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import { Uploader } from './Uploader';

import { Button, Checkbox, FormControlLabel, TextField, FormGroup } from '@mui/material';
import { LongOutputContainer } from './LongOutputContainer';

export const EntityIdentificationPath = () => {
    const [response, setResponse] = useState("画像を選択してください")
    const [names, setNames] = useState("")
    const [src, setSrc] = useState("");
    const [celebrityDetection, setCelebrityDetection] = useState(false);
    const [text, setText] = useState("");
    const [collection, setCollection] = useState(false);

    function identifyFromFile(event) {
      
      setResponse('検索中...');
      setNames("");
      console.log(text)
      Predictions.identify({
        entities: {

            source: {
              key: text,
              level: 'public'
            },

            collection: collection,
            celebrityDetection: celebrityDetection
        }
          /**For using the Identify Entities advanced features, enable collection:true and comment out celebrityDetection
           * Then after you upload a face with PredictionsUpload you'll be able to run this again
           * and it will tell you if the photo you're testing is in that Collection or not and display it*/

      }).then(result => {
        console.log('result', result);
        const entities = result.entities;
        let imageId = ""
        let names = ""
        entities.forEach(({ boundingBox, metadata: { name = "", externalImageId = "" } }) => {
          const {
            width, // ratio of overall image width
            height, // ratio of overall image height
            left, // left coordinate as a ratio of overall image width
            top // top coordinate as a ratio of overall image height
          } = boundingBox;
          imageId = externalImageId;
          if (name) {
            names += name + " .";
          }
          console.log({ name });
        })
        if (imageId) {
          Storage.get("", {
            customPrefix: {
              public: imageId
            },
            level: "public",
          }).then(setSrc); // this should be better but it works
        }
        setNames(names)
        setResponse(JSON.stringify(entities))
      })
        .catch(err => console.log(err))
    }
  
    return (
      <div className="Text">
        <div>
          <h3>顔認識　S3</h3>
          <FormGroup>
            <FormControlLabel control={<Checkbox onClick={()=>setCelebrityDetection(!celebrityDetection)}/>} label="有名人認証" />
            <FormControlLabel control={<Checkbox onClick={()=>setCollection(!collection)}/>} label="コレクションの中での認証" />
          </FormGroup>
   
          <TextField
            id="tf"
            multiline
            rows={4}
            margin="normal"
            onChange={(e)=>setText(e.target.value)}
            />
          <Button onClick={identifyFromFile}>検出する</Button>
          <LongOutputContainer result={response==="" ? "検索結果０件": response}/>
          <LongOutputContainer result={names}/>
          { src && <img src="{src}"></img>}
        </div>
      </div>
    );
  }