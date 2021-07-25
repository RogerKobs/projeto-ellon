import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import Page from "./pages/page";

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3f51b5' },
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none',
      }
    },
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme} >
        <Page />
      </ThemeProvider>
    </div>
  );
}

export default App;
