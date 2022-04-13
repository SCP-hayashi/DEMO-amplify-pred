import React from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import awsExports from './aws-exports';

import { IdentifyText } from './components/IdentifyText';
import { TextToSpeech } from './components/TextToSpeech';
import { Transcribe } from './components/Transcribe';
import { Translate } from './components/Translate';
import { EntityIdentification } from './components/EntityIdentification';
import {EntityIdentificationPath} from './components/EntityIdentificationPath';
import { TextInterpretation } from './components/TextInterpretation';
import { LabelsIdentification } from './components/LabelsIdentification';
import { PredictionsUpload } from './components/PredictionsUpload';

Amplify.configure(awsExports);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

export default function App() {
  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <IdentifyText/>
            <br/>
            <TextToSpeech/>
            <br/>
            <Transcribe/>
            <br/>
            <Translate/>
            <br/>
            <EntityIdentification/>
            <br/>
            <EntityIdentificationPath/>
            <br/>
            <TextInterpretation/>
            <br/>
            <LabelsIdentification/>
            <br/>
            <PredictionsUpload/>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
}