// Empty.jsx

import React from 'react';
import Box from '../../Box';

export default function Empty({ children }) {
  return (
    <Box>
      <div className="w-full text-center font-medium text-gray-500">
        {children}
      </div>
    </Box>
  );
}
