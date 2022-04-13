import  { Predictions} from '@aws-amplify/predictions';
import { Storage } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import { Uploader } from './Uploader';

import { Checkbox, FormControlLabel, TextField, FormGroup } from '@mui/material';
import { LongOutputContainer } from './LongOutputContainer';

export const EntityIdentification = () => {
    const [response, setResponse] = useState("画像を選択してください")
    const [names, setNames] = useState("")
    const [src, setSrc] = useState(undefined);
    const [dummy, setDummy] = useState(undefined)
    const [celebrityDetection, setCelebrityDetection] = useState(false);
    const [collection, setCollection] = useState(false);

    function identifyFromFile(event) {
      const { target: { files } } = event;
      const [file,] = files || [];
      console.log(file)
      if (!file) {
        return;
      }

      setDummy(file)
      setResponse('検索中...');
      setNames("");

      Predictions.identify({
        entities: {
          source: {
            file,
          },
          /**For using the Identify Entities advanced features, enable collection:true and comment out celebrityDetection
           * Then after you upload a face with PredictionsUpload you'll be able to run this again
           * and it will tell you if the photo you're testing is in that Collection or not and display it*/
          collection: collection,
          celebrityDetection: celebrityDetection
        }
      }).then(result => {
        console.log('result', result);
        const entities = result.entities;
        let imageId = ""
        let names = ""
        entities.forEach(({ boundingBox, metadata: { name, externalImageId } }) => {
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
        })
        if (imageId) {
          Storage.get("", {
            customPrefix: {
              public: imageId
            },
            level: "public",
          }).then(setSrc); // this should be better but it works
        }
        console.log({ entities });
        setNames(names)
        setResponse(JSON.stringify(entities))
      })
        .catch(err => console.log(err))
    }
  
    return (
      <div className="Text">
        <div>
          <h3>顔認識</h3>
          {/* <input type="file" onChange={identifyFromFile}></input> */}
          <FormGroup>
            <FormControlLabel control={<Checkbox onClick={()=>setCelebrityDetection(!celebrityDetection)}/>} label="有名人認証" />
            <FormControlLabel control={<Checkbox onClick={()=>setCollection(!collection)}/>} label="コレクションの中での認証" />
          </FormGroup>
          <Uploader file={dummy} onFileChanged={identifyFromFile} acceptType="image/png, image/jpeg"/>
          <LongOutputContainer result={response==="" ? "検索結果０件": response}/>
          <LongOutputContainer result={names}/>
          { src && <img src={src}></img>}
        </div>
      </div>
    );
  }