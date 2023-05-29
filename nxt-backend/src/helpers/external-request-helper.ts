import axios from 'axios'
import { ErrorHandler } from './error-handler.helper'

class ExternalRequestHelper {
  public async post(url: string, body: any, auth: string, contentType: string) {
    const { data } = await axios.post(
      url,
      body,
      {
        headers: {
          "Authorization": auth,
          "Content-Type": contentType
        }
      },
    )
    return data


  } catch(e) {
    console.log({ external_request_error: e })
    throw new ErrorHandler(e.response.status, e.response.data.message || e.response.statusText)
  }
}


export default new ExternalRequestHelper()
