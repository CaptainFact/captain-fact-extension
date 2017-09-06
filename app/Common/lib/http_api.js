import "isomorphic-fetch"

import { CF_API_URL } from "../../Common/lib/constants"


class CaptainFactHttpApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  prepareResponse(promise) {
    return new Promise((fulfill, reject) => {
      return promise.then(response => {
        return response.text().then((body) => {
          body = body ? JSON.parse(body) : null
          if (!response.ok) {
            if (body.error)
              reject(body.error)
            else
              reject(body.errors)
          }
          else
            fulfill(body)
        })
      })
    })
  }

  makeRequest(resourceUrl, requestType, data) {
    const response = fetch(this.baseUrl + resourceUrl, {
      method: requestType,
      body: data ? JSON.stringify(data) : '',
      headers: Object.assign({
        "Content-Type": "application/json"
      }, this.headers)
    })
    return this.prepareResponse(response)
  }

  get(resourceUrl) {
    const response = fetch(this.baseUrl + resourceUrl, {headers: this.headers})
    return this.prepareResponse(response)
  }

  post(resourceUrl, data) {
    return this.makeRequest(resourceUrl, "POST", data)
  }

  put(resourceUrl, data) {
    return this.makeRequest(resourceUrl, "PUT", data)
  }

  delete(resourceUrl, data) {
    return this.makeRequest(resourceUrl, "DELETE", data)
  }
}


// Configure HttpApi
const HttpApi = new CaptainFactHttpApi(CF_API_URL)
export default HttpApi
