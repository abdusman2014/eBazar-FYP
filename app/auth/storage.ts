import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY = 'userId';

const storeUserIdInCache = async (v: any) => {
  try {
    const userIdObjJson = JSON.stringify(v);
    await AsyncStorage.setItem(USER_ID_KEY, userIdObjJson);
    console.log(
      'asyncstorage - userId - updated cached user id to: ',
      JSON.stringify(v),
    );
  } catch (error) {
    console.error('asyncstorage - UserId - setItem: ', JSON.stringify(error));
    throw new Error('Unable to cache user Id!');
  }
};


const getCachedUserId = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_ID_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    return null;
  }
};


const removeCachedUserId = async () => {
  try {
    await AsyncStorage.removeItem(USER_ID_KEY);
    console.log(
      'asyncstorage - removeCachedUserId - cache invalidated',
    );
  } catch (e) {
    // remove error
    console.warn('asyncstorage - Cached user id remove error: ', e);
  }
};

export default {
  storeUserIdInCache,
  getCachedUserId,
  removeCachedUserId,
};
