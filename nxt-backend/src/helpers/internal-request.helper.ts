import axios from 'axios'
import { ErrorHandler } from './error-handler.helper'

export class InternalRequestHelper {
  public async get(url: string) {
    try {
      const response = await axios.get(url)

      return response.data
    } catch (e) {
      throw new ErrorHandler(e.response.status, e.response.statusText)
    }
  }

  public async post(url: string, payload: any) {
    try {
      const response = await axios.post(url, payload)
      return response.data
    } catch (e) {
      throw new ErrorHandler(e.response.status, e.response.data.message || e.response.statusText)
    }
  }

  public async delete(url: string, payload?: any) {
    try {
      const response = await axios.delete(url, payload)

      return response.data
    } catch (e) {
      throw new ErrorHandler(e.response.status, e.response.data.message || e.response.statusText)
    }
  }
}

export default new InternalRequestHelper()
