import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {memo} from 'react';
import {AuthStackParamList} from '../../@types/navigation';
import Login from '../../screens/auth/login/Login';

const AuthStack = createStackNavigator<AuthStackParamList>();
const Authstack: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

export default memo(Authstack);
