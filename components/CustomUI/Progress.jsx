"use client"

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

// Styled LinearProgress
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#3DCBB1',
    ...theme.applyStyles('dark', {
      backgroundColor: '#3DCBB1',
    }),
  },
}));

// Wrapper Component with Custom Max Support
const CustomProgress = ({ value, max = 100, ...props }) => {
  const normalizedValue = (value / max) * 100; // Normalize value based on max
  return <BorderLinearProgress variant="determinate" value={normalizedValue} {...props} />;
};

export default CustomProgress;
