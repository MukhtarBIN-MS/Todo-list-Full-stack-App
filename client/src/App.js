import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles/';
import TopRoute from './components/toproute/TopRoute';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createUploadLink} from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';

const apolloCache = new InMemoryCache();
const uploadLink = createUploadLink({uri: 'http://localhost:5000/graphql'});
const client = new ApolloClient({cache: apolloCache, link: uploadLink});

function App() {

  return (
    <div>
    <MuiThemeProvider>
        <ApolloProvider client={client}>
          <TopRoute/>
        </ApolloProvider>
    </MuiThemeProvider>
    </div>
  );

}

export default App;