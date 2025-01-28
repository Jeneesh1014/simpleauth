import {useNavigation} from '@react-navigation/native';
import {memo, useEffect} from 'react';
import {navigationProp} from '../../@types/navigation';
import {
  IS_LOGIN,
  getStorageData,
} from '../../services/storageHandler/storageHandler';

const SpashScreen = () => {
  const navigation = useNavigation<navigationProp>();
  useEffect(() => {
    const navigationStuff = async () => {
      const isLogin = await getStorageData(IS_LOGIN);
      console.log('is', isLogin);

      if (isLogin) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        });
      }
    };
    navigationStuff();
  }, []);
  return null;
};

export default memo(SpashScreen);
