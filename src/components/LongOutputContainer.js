
import { Paper, Container } from '@mui/material';

export const LongOutputContainer = ({result}) => {
    return(
        <Paper style={{maxHeight: 200, overflow: 'auto'}}>
            <Container>
                {result}
            </Container>
        </Paper>
    )
}