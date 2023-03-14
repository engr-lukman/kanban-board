export const setStorage = (keyName: string, data: any) => {
  return localStorage.setItem(keyName, data);
};

export const getStorage = (keyName: any) => {
  return localStorage.getItem(keyName);
};
