import logo from './logo.svg';
import './App.css';

import { Amplify } from 'aws-amplify';
import {withAuthenticator,AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import {theme} from './theme'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import S3Bucket from './pages/s3Bucket';
import Editform from './pages/s3Bucket/Editform';
import MenuItem from './pages/menuItem';
import Products from './pages/Products';

//Amplify.configure(awsExports);


Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:eb4506f2-197d-4e8f-90ff-c9f07cbbb3ac',
    region: 'us-east-1',
    userPoolId: 'us-east-1_3Vb9EzUJE',
    userPoolWebClientId: '6l2b78fja9u9d4ke4kt34vter',
  },
  Storage: { 
    bucket: 'fairview1',
    region: 'us-east-1',
    identityPoolId: 'us-east-1:eb4506f2-197d-4e8f-90ff-c9f07cbbb3ac'
   }

});

function App({ signOut, user }) {

  const navbarOverrides = {
   
    "Flex.Flex[1].Text[0]": {
      children: user?.username,
    },
    "Flex.Flex[1].Button[0]": {
      onClick: signOut,
    },
  };


  return (
    <AmplifyProvider theme={theme}>
      
      <Router>
        <Navbar overrides={navbarOverrides} width="100%"/>
        <Routes >
          <Route path='/' exact caseSensitive={false} element={<S3Bucket/>}  />
          <Route path='/menuitem' caseSensitive={false} element={<MenuItem/>}/>
          <Route path='/editS3/:file_name' caseSensitive={false} element={<Editform/>}  />
        </Routes>
      </Router>  

    </AmplifyProvider>
  );
}



export default withAuthenticator(App);