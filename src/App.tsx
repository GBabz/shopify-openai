import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import Main from './components/Main/Main';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: `"Red Hat Display", sans-serif`,
      textTransform: 'none',
    },
  },
})

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;
