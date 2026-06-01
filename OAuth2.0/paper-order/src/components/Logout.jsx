import { GoogleLogout } from 'react-google-login'

const clientId =
  '5210533445-74h5ndc00pn03l4a4d1sbbrr064eutbg.apps.googleusercontent.com'

  function Logout () {

    const onSuccess = () => {
        console.log('Logout was successful')
    }
    return (
        <div id="signOutButton">
            <GoogleLogout clientId={clientId} buttonText='Logout' onLogoutSuccess={onSuccess} />

        </div>
    )
  }
  export default Logout