import React,{useState , useEffect} from 'react';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';
import {Link , Redirect} from 'react-router-dom';
import './auth.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const clientId =
  '748260318242-76dqcmao1nmjjicnelma77u70c57mbep.apps.googleusercontent.com';

function Login() {

    
 const [redirect,setRedirect] = useState(false);
 const [opensuccess, setOpenSuccess] = React.useState(false);
 const [openerror, setOpenError] = React.useState(false);
 const [successmsg,setSuccessmsg] = React.useState('');
 const [errormsg,setErrormsg] = React.useState('');
 const [loading,setLoading] = React.useState(false);
 const classes = useStyles();

 function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    localStorage.setItem("User",JSON.stringify(res.profileObj))
    sessionStorage.setItem("Login",true);
    setOpenSuccess(true)
    setSuccessmsg(`Logged in successfully welcome ${res.profileObj.name} 😍`) 

    setRedirect(true)
    refreshTokenSetup(res);
  };
  

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    setOpenError(true)
    setErrormsg(`Failed to login. 😢`);
  };

    const performRedirect = () => {
    if(redirect){
        return <Redirect to='/home'></Redirect> 
    }
    }
useEffect(() => {
  console.log(opensuccess);
  console.log(successmsg);
})
    
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
  };

  return (
    <div style={{position: 'absolute',width: '100%',height: '100%',overflow: 'hidden'}}>
    {loading ? <CircularProgress style={{position: 'absolute',top:'50%',left:'50%',}}/> :<div>
        <div  className="signInButton">
          <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          
          />
          {performRedirect()}
        
        </div>
        <div style={{marginTop: '7em'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,128L80,122.7C160,117,320,107,480,122.7C640,139,800,181,960,186.7C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        </div>

        </div> }

      <Snackbar open={opensuccess} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {successmsg}
          </Alert>
      </Snackbar>
      <Snackbar open={openerror} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {errormsg}
          </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;