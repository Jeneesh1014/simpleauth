import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {memo} from 'react';
import {AuthStackParamList} from '../../@types/navigation';
import Login from '../../screens/auth/login/Login';
import Register from '../../screens/auth/register/Register';

const AuthStack = createStackNavigator<AuthStackParamList>();
const Authstack: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default memo(Authstack);
