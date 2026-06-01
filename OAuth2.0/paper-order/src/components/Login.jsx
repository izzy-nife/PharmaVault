
import {GoogleLogin} from 'react-google-login'

const clientId =
  '5210533445-74h5ndc00pn03l4a4d1sbbrr064eutbg.apps.googleusercontent.com';

  function Login () {
    const onSuccess = (res) => {
        console.log('It was a success', res.profileObj)
    }
    const onFailure = (res) => {
          console.log('It was a success', res )
        }
    return (
        <div id='signInButton'>
        <GoogleLogin clientId={clientId} buttonText="Login" onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={'single_host_origin'} isSignedIn={true} />
        </div>


    )
  }

  export default Login