import { useState } from "react";
import { Uploader } from "./Uploader";
import { Storage } from 'aws-amplify';

export const PredictionsUpload = () => {
    /* This is Identify Entities Advanced feature
     * This will upload user images to the appropriate bucket prefix
     * and a Lambda trigger will automatically perform indexing
     */
    const [dummy, setDummy] = useState(undefined)
    const [status, setStatus] = useState("アップロードする写真を選んでください。")
    function upload(event) {
      setStatus("アップロード中...")
      const { target: { files } } = event;
      const [file,] = files || [];

      setDummy(file)

      Storage.put(file.name, file, {
        level: 'public',
        customPrefix: {
          public: 'public/',
        }
      }).then(()=>setStatus("アップロード完了"));
    }
  
    return (
      <div className="Text">
        <div>
          <h3>S3に画像をアップロードする</h3>
          <Uploader file={dummy} onFileChanged={upload} acceptType="image/png, image/jpeg"/>
        </div>
        <p>{status}</p>
      </div>
    );
  }