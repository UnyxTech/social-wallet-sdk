export const LOCAL_USER_TOKEN = 'local-user-token';
export const LOCAL_USER_INFO = 'local-user-info';
export const LOCAL_EMAIL_LOGIN_REQ = 'local-email-login-req';


export const getUserToken = () => {
  try {
    const clientId = localStorage.getItem(LOCAL_USER_TOKEN);
    return JSON.parse(clientId ?? '');
  } catch (e) {
    return null;
  }
};

export const setUserToken = (value: string) => {
  try {
    localStorage.setItem(LOCAL_USER_TOKEN, JSON.stringify(value));
  } catch (e) {
    // do something
  }
};

export const removeUserToken = () => {
  try {
    localStorage.removeItem(LOCAL_USER_TOKEN);
  } catch (e) {
    // do something
  }
};

export const getUserInfo = () => {
  try {
    const clientId = localStorage.getItem(LOCAL_USER_INFO);
    return JSON.parse(clientId ?? '');
  } catch (e) {
    return null;
  }
};

export const setUserInfo = (value: string) => {
  try {
    localStorage.setItem(LOCAL_USER_INFO, JSON.stringify(value));
  } catch (e) {
    // do something
  }
};

export const removeUserInfo = () => {
  try {
    localStorage.removeItem(LOCAL_USER_INFO);
  } catch (e) {
    // do something
  }
};

export const getEmailReq = () => {
  try {
    const req = localStorage.getItem(LOCAL_EMAIL_LOGIN_REQ);
    return JSON.parse(req ?? '');
  } catch (e) {
    return null;
  }
}

export const setEmailReq = (req: string) => {
  try {
    localStorage.setItem(LOCAL_EMAIL_LOGIN_REQ, req);
  } catch (e) {
    return null;
  }
}

export const removeEmailReq = () => {
  try {
    localStorage.removeItem(LOCAL_EMAIL_LOGIN_REQ);
  } catch (e) {
    // do something
  }
};
