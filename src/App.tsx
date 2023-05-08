import {THEME, TonConnectUIProvider} from '@tonconnect/ui-react';
import {ThemeProvider} from '@mui/styles';
import {createTheme} from '@mui/material';
import Router from './route/Router';

const theme = createTheme();
const TonProofDemoApi = {
  connectWalletRequest: {
    permissions: [
      {
        name: 'https://demo.tonconnect.dev',
        params: {
          message: 'Hello, TonConnect!',
        },
      },
    ],
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TonConnectUIProvider
        manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
        getConnectParameters={() => TonProofDemoApi.connectWalletRequest as any}
        uiPreferences={{theme: THEME.DARK}}>
        {/* <BrowserRouter basename="/Daoton"> */}
        <Router />
      </TonConnectUIProvider>
    </ThemeProvider>
  );
}

export default App;
