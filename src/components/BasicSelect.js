import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({title, values, value, setValue, sx}) {
  // const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box component="div" sx={{ 
      minWidth: 120, m: 2,
      ...sx
    }}>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={title}
          onChange={handleChange}
        >
        {Object.keys(values).map((key)=>
            <MenuItem key={key} value={values[key]}>{key}</MenuItem>
        )}
        </Select>
      </FormControl>
    </Box>
  );
}