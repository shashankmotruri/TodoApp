import React,{useState} from 'react';
import { GoogleLogout } from 'react-google-login';
import {Link , Redirect} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const clientId =
  '748260318242-76dqcmao1nmjjicnelma77u70c57mbep.apps.googleusercontent.com';

function Logout() {

  const [redirect,setRedirect] = useState(false);
  const [opensuccess, setOpenSuccess] = React.useState(false);
  const [successmsg,setSuccessmsg] = React.useState('');

  const onSuccess = () => {
    console.log('Logout made successfully');
    setOpenSuccess(true)
    setSuccessmsg('Logout made successfully ✌')
    setRedirect(true);
  };

  const performRedirect = () => {
    if(redirect){
        return <Redirect to='/'></Redirect> 
    }
    }
        
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };
  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>

      {performRedirect()}
      <Snackbar open={opensuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {successmsg}
        </Alert>
    </Snackbar>
    </div>
  );
}

export default Logout;