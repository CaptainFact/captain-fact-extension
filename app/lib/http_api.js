import fetch from 'isomorphic-fetch'

import { CF_API_URL } from './constants'

class CaptainFactHttpApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  prepareResponse(promise) {
    return promise.then((response) => {
      return response.text().then((body) => {
        body = body ? JSON.parse(body) : null
        if (body.errors) throw body.errors
        else return body.data
      })
    })
  }

  makeRequest(requestType, data) {
    const response = fetch(this.baseUrl, {
      method: requestType,
      body: data ? JSON.stringify(data) : '',
      headers: { 'Content-Type': 'application/json' },
    })
    return this.prepareResponse(response)
  }

  post(data) {
    return this.makeRequest('POST', data)
  }
}

// Configure HttpApi
const HttpApi = new CaptainFactHttpApi(CF_API_URL)
export default HttpApi
