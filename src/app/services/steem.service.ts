import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import * as config from '../app.config'

@Injectable({
  providedIn: 'root'
})
export class SteemService {

  constructor(
    private _http:HttpClient
  ) { }
  
  call(method, params) {
    return this._http.post(
      config.rpc.https,
      {
        "jsonrpc":"2.0",
        "method":method,
        "params":params,
        "id":1
      }
    ).toPromise()
  }

  /*
  * Reputation formatter copied from 'steemit/steem-js'
  * and converted to typescript by @mahdiyari
  */
  Reputaionformatter(_reputation){
    if (_reputation == null) return _reputation
    _reputation = parseInt(_reputation)
    let rep = String(_reputation)
    let neg = rep.charAt(0) === "-"
    rep = neg ? rep.substring(1) : rep
    let str = rep
    let leadingDigits = parseInt(str.substring(0, 4))
    let log = Math.log(leadingDigits) / Math.log(10)
    let n = str.length - 1
    let out = n + (log - Math.trunc(log))
    if (isNaN(out)) out = 0
    out = Math.max(out - 9, 0)
    out = (neg ? -1 : 1) * out
    out = out * 9 + 25
    return Math.trunc(out)
  }

}
