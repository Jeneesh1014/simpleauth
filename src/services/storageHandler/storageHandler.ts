import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

export const IS_LOGIN = 'is_login';
export const USER_INFO = 'user_info';
const getStorageData = async (key: string) => {
  try {
    const get_item = await AsyncStorage.getItem(key);
    if (get_item) {
      const data = JSON.parse(get_item);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    throw Error('Key not found');
  }
};

const setStorageData = async (key: string, value: any): Promise<void> => {
  try {
    AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw Error('Key not found');
  }
};

const removeStorageData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new Error('Error removing storage data: ' + error);
  }
};
const getEncryptedStorageData = async (key: string) => {
  try {
    const get_item = await EncryptedStorage.getItem(key);
    if (get_item) {
      const data = JSON.parse(get_item);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    throw Error('Key not found');
  }
};

const setEncryptedStorageData = async (
  key: string,
  value: any,
): Promise<void> => {
  try {
    EncryptedStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw Error('Key not found');
  }
};

const removeEncryptedStorageData = async (key: string): Promise<void> => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    throw new Error('Error removing storage data: ' + error);
  }
};

export {
  getStorageData,
  setStorageData,
  removeStorageData,
  removeEncryptedStorageData,
  setEncryptedStorageData,
  getEncryptedStorageData,
};
