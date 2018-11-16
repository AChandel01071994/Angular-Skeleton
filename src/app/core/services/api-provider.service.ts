import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from '@env/environment';
import { Endpoint } from '@app/core/models/endpoint';
 


export const END_POINTS = new InjectionToken('END_POINTS')

@Injectable({providedIn : 'root'})

export class ApiProviderService {
  endPoints: Endpoint;
  private readonly baseUrl = environment.baseUrl;

  constructor( @Inject(END_POINTS) private _endPoints) {
    this.endPoints = _endPoints[0];
  }

  resolve(url: string, params?: any, isQueryParams = false) {
    let resolved: string = '';
    let first = true;
    if (!params) { return `${this.baseUrl}${url}` }
    if (isQueryParams) {
      resolved = Object.keys(params).reduce((acc, param) => {
        if (first) {
          first = false;
          return `${acc}?${param}=${params[param]}`
        } else {
          return `${acc}&${param}=${params[param]}`
        }
      }, url)
    } else {
      resolved = Object.keys(params).reduce((acc, param) => {
        return acc.replace(`:${param}`, `${params[param]}`)
      }, url)
    }
    return `${this.baseUrl}${resolved}`;
  }

}
