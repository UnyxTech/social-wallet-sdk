import { googleId } from './constant'
import { emailCheck, loginByGmail, loginCode, loginVerify, sendRegister, setApi, verifyRegister } from './utils/apiUtils'
import { getEmailReq, removeEmailReq, removeUserInfo, setEmailReq, setUserToken } from "./utils/LocalstorageUtils";
import { getEthAddress, getEthPrivateKey, getUserInfoFromLocalFirst } from './utils/utils'
import { decryptInfo } from './utils/decryptUtils'

export class TomoSDK {
  static setDevApi() {
    setApi({isDev: true})
  }

  static setProdApi() {
    setApi({isDev: false})
  }

	clientId: string = '';

	constructor({clientId}: {clientId: string}) {
		this.clientId = clientId;
	}

  getGoogleAuthId() {
    return googleId
  }

  async loginByGoogle(code: string) {
    try {
      const data = await loginByGmail(code, this.clientId)
      const token = data.result.token
      if (!token) {
        throw new Error('Login failed')
      }
      setUserToken(token)
      removeEmailReq()
      removeUserInfo()
      return true
    } catch (e) {
      return false
    }
  }

  async sendCode(email: string) {
    try {
      const checkResp = await emailCheck(email)
      if (checkResp.result) {
        // sign up
        await sendRegister(email)
        const req = {
          type: 'signup',
          email
        }
        setEmailReq(JSON.stringify(req))
      } else {
        // sign in
        await loginCode(email)
        const req = {
          type: 'signin',
          email
        }
        setEmailReq(JSON.stringify(req))
      }
      return true
    } catch (e) {
      return false
    }
  }

  async verifyCode(code: string) {
    try {
      const req = getEmailReq()
      if (!req || !req.email || (req.type !== 'signup' && req.type !== 'signin')) {
        throw new Error('Invalid request')
      }

      let resp
      if (req.type === 'signup') {
        resp = await verifyRegister(req.email, code, this.clientId)
      } else {
        resp = await loginVerify(req.email, code, this.clientId)
      }

      const token = resp.result.token
      if (!token) {
        throw new Error('Login failed')
      }
      setUserToken(token)
      removeEmailReq()
      removeUserInfo()

      return true
    } catch (e) {
      return false
    }
  }

  async getEthAddress() {
    try {
      const data = await getUserInfoFromLocalFirst(this.clientId)
      if (!data.result) {
        throw new Error('Get parts failed')
      }

      const info = decryptInfo(data.result, this.clientId)

      return getEthAddress(info.part1, info.part2)
    } catch(e) {
      console.error(e)
      return null
    }
  }
  async getEthPrivateKey() {
    try {
      const data = await getUserInfoFromLocalFirst(this.clientId)
      if (!data.result) {
        throw new Error('Get parts failed')
      }

      const info = decryptInfo(data.result, this.clientId)

      return getEthPrivateKey(info.part1, info.part2)
    } catch(e) {
      return null
    }
  }
}
