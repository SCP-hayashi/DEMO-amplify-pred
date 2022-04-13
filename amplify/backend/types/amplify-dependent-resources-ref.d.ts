export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "amplifypred45d3d32f": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "predictions": {
        "identifyText": {
            "region": "string",
            "format": "string"
        },
        "identifyEntities": {
            "region": "string",
            "celebrityDetectionEnabled": "string",
            "maxEntities": "string",
            "collectionId": "string"
        },
        "identifyLabels": {
            "region": "string",
            "type": "string"
        },
        "translateText": {
            "region": "string",
            "sourceLang": "string",
            "targetLang": "string"
        },
        "transcription": {
            "region": "string",
            "language": "string"
        },
        "interpretText": {
            "region": "string",
            "type": "string"
        },
        "speechGeneration": {
            "region": "string",
            "language": "string",
            "voice": "string"
        }
    },
    "storage": {
        "s3eafae09d": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "RekognitionIndexFacesTrigger436b972e": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}