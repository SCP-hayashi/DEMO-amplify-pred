import '@aws-amplify/ui-react/styles.css';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

export const Uploader = ({file, onFileChanged, acceptType}) => {
    return(
        <Box component="span" >
            <Button
                sx={{ display: 'inline' }}
                variant="contained"
                component="label">
                ファイルアップロード
                <input
                    type="file"
                    hidden
                    onChange={onFileChanged}
                    accept={acceptType}
                />
            </Button>
            <Box
                component="div"
                sx={{ display: 'inline' }}
                >
                {file? file.name.length > 15 ? file.name.substr(0,10) + "..." + file.name.substr(-5): file.name: ""}
            </Box>
        </Box>
    )
}