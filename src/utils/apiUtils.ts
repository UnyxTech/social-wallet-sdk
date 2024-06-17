import axios from "axios";
import { getUserToken } from "./LocalstorageUtils";

const BASE_TEST_URL = 'https://app.unyx.tech/api/'
const BASE_PROD_URL = 'https://apps-prod.tomo.inc/api/'

let api: any
export const setApi = ({isDev = true}) => {
  if (isDev) {
    api = axios.create({ baseURL: BASE_TEST_URL });
  } else {
    api = axios.create({ baseURL: BASE_PROD_URL });
  }

  api.interceptors.request.use(
    (config: any) => {
      const token = getUserToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: any) => {
      if (error?.response?.status === 401) {
        return Promise.reject(error);
      }
    }
  );
}

api = setApi({isDev: false})

export const loginByGmail = async (code: string, clientId: string) => {
	try {
		const { data } = await api.post('socialLogin/projectUser/loginByGoogle', {
			code,
      clientId
		});
		return data;
	} catch(e) {
		//
	}
}

export const sendRegister = async (email: string) => {
  try {
		const { data } = await api.get(`socialLogin/projectUser/email/sendRegister?email=${email}`);
		return data;
	} catch(e) {
		//
	}
}

export const verifyRegister = async (email: string, code: string, clientId: string) => {
	try {
		const { data } = await api.post('socialLogin/projectUser/email/verifyRegister', {
      email,
			code,
      clientId
		});
		return data;
	} catch(e) {
		//
	}
}

export const loginCode = async (email: string) => {
  try {
		const { data } = await api.get(`socialLogin/projectUser/email/loginCode?email=${email}`);
		return data;
	} catch(e) {
		//
	}
}

export const loginVerify = async (email: string, code: string, clientId: string) => {
	try {
		const { data } = await api.post('socialLogin/projectUser/email/loginVerify', {
      email,
			code,
      clientId
		});
		return data;
	} catch(e) {
		//
	}
}

export const emailCheck = async (email: string) => {
	try {
		const { data } = await api.get(`login/emailCheck?email=${email}`);
		return data;
	} catch(e) {
		//
	}
}

export const getUserInfo = async (clientId: string) => {
  try {
		const { data } = await api.get(`socialLogin/projectUser/info?clientId=${clientId}`);
		return data;
	} catch(e) {
		//
	}
}
