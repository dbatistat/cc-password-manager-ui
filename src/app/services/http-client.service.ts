import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import * as qs from 'qs'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private readonly instance: AxiosInstance

  constructor() {
    const requestConfig: AxiosRequestConfig = {
      paramsSerializer: (params: object) =>
        qs.stringify(params, { arrayFormat: 'brackets' }),
      baseURL: environment.apiUrl
    }

    this.instance = axios.create(requestConfig)

    this.instance.interceptors.request.use((req) => this.interceptRequest(req))

    this.instance.interceptors.response.use(
      (res) => this.interceptResponse(res),
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.get(url, {
      ...config,
    })
  }

  post(url: string, data: unknown, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.post(url, data, {
      ...config,
    })
  }

  delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.delete(url, {
      ...config,
    })
  }

  put(url: string, data: unknown, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.put(url, data, {
      ...config,
    })
  }

  patch(url: string, data: unknown, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.patch(url, data, {
      ...config,
    })
  }

  private interceptRequest(request: AxiosRequestConfig): AxiosRequestConfig {
    // set timestamp to calculate response time
    request.headers.ts = performance.now()

    return request
  }

  private interceptResponse(response: AxiosResponse): AxiosResponse {
    return response.data
  }
}
