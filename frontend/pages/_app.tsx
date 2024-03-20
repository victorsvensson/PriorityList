import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Creating a theme with MUI
import { ComponentType } from 'react';

const theme = createTheme({
    // You can customize your theme here.
});

interface MyAppProps {
    Component: ComponentType;
    pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Normalize CSS and provide baseline styles */}
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;