import Layout from '@/components/layout';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';
import { SnackbarProvider } from 'notistack';

          


export default function App({ Component, pageProps }) {
  return (
    <SnackbarProvider
      preventDuplicate
      autoHideDuration={2000}
      dense
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SnackbarProvider>
  );
}
