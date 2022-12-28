import * as React from 'react';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';

export default function SwitchButton({ onChange }) {
  return (
    <Switch
    onChange={onChange}
      slotProps={{
        track: {
          children: (
            <React.Fragment>
              <Typography component="span" level="inherit" sx={{ ml: '10px' }}>
                תיקים פעילים
              </Typography>
              <Typography component="span" level="inherit" sx={{ mr: '8px' }}>
                כל התיקים
              </Typography>
            </React.Fragment>
          ),
        },
      }}
      sx={{
        '--Switch-thumb-size': '27px',
        '--Switch-track-width': '64px',
        '--Switch-track-height': '31px',
        '--Switch-track-border-radius': '15px',
        '--Switch-track-background-color': '#ccc',
        '--Switch-thumb-background-color': '#fff',
        '--Switch-thumb-border-radius': '50%',
        '--Switch-thumb-box-shadow': '0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24)',
        '--Switch-thumb-transition': 'all 0.3s ease',
      }}
    />
  );
}