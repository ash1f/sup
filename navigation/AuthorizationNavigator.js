import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import Login from '../screens/Authorization/Login';
import Register from '../screens/Authorization/Register';
import EmailVerification from '../screens/Authorization/EmailVerification';
import EmailValidity from '../screens/Authorization/EmailValidity';

export default createStackNavigator({
  EmailValidity: EmailValidity,
  Login: Login,
  Registration: createSwitchNavigator({
    Register: Register,
    EmailOTP: EmailVerification
  }, {
      headerMode: "none",
      initialRouteName: "Register"
  })
}, {
    headerMode: "none",
    initialRouteName: "EmailValidity"
  });
