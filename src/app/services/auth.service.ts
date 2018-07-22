/*
* Authorizing service
* Used in the login process
**/
import { Injectable } from '@angular/core'
import { Initialize as sc2 } from 'sc2-sdk'
import { Router,ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import * as config from '../app.config'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public api // sc2
  public isAuth // is login?
  public user // sc2.me
  public username // url params
  public access_token // url params
  public expires_in // url params
  // Constructor
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private _http:HttpClient
  ){
    this.Initialize()
    this.LoginByCookie()
    this.LoginByURL()

    this.ConsoleWarning()
  }
  Initialize(){
    this.api = sc2({
      baseURL:'https://steemconnect.com',
      app: config.sc2.app,
      callbackURL: config.sc2.url,
      scope: config.sc2.scope
    })
  }
  LoginByCookie(){
    if(this.getCookie('username') && this.getCookie('access_token')){
      this.username = this.getCookie('username')
      this.access_token = this.getCookie('access_token')
      this.api.setAccessToken(this.access_token)
      if(!this.user) this.Me()
    }
  }
  LoginByURL(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.username = params.username ? params.username :null
      this.access_token = this.username ? (params.access_token ? params.access_token :null) :null
      this.expires_in = this.access_token ? (params.expires_in ? params.expires_in:null):null
      if(this.username && this.access_token && this.expires_in){
        this.setCookie('username',this.username,7)
        this.setCookie('access_token',this.access_token,7)
        this.setCookie('expires_in',this.expires_in,7)
        this.api.setAccessToken(this.access_token)
        if(!this.user) this.Me()
        this.router.navigate(['/'])
      }
    })
  }
  Me(){
    this.api.me((err,result) => {
      if(!err && result){
        this.isAuth = true
        this.user = result
        this.ConfirmLoginProcess()
      }else{
        this.isAuth = false
        // if(err.toString().indexOf('Network request failed')){
        //   console.log('no internet')
        //   alert('You are offline! check your internet connection!')
        // }      
      }
    })
  }
  /*
  * Assign a hash to each user and use that hash (instead of access_token) 
  * to identify if user is authorized (in the backend)
  */
  ConfirmLoginProcess(){
    if(this.isAuth){
      this._http.post(
        config.api.login_apis.confirm_process,
        {
          hash_key: this.getCookie('hash_key') ? this.getCookie('hash_key') : null,
          username:this.user.user,
          uid:this.user.account.id,
          access_token:this.getCookie('access_token')
        }
      )
      .toPromise()
      .then((res : any) => {
        if(res && res.uid && res.hash_key && res.username){
          this.setCookie('hash_key',res.hash_key,7)
          this.setCookie('uid',res.uid,7)
        }else{
          console.log('Unable to set hash_key! please relogin or report this problem!')
        }
      })
      .catch(err => console.log(err))
    }
    
  }

  setCookie(cname, cvalue, exdays) {
		let d = new Date()
		d.setTime(d.getTime() + (exdays*24*60*60*1000))
		let expires = "expires="+ d.toUTCString()
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
  }
  getCookie(cname) {
		let name = cname + "="
		let decodedCookie = decodeURIComponent(document.cookie)
		let ca = decodedCookie.split(';')
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i]
			while (c.charAt(0) == ' ') {
				c = c.substring(1)
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length)
			}
		}
		return ""
  }
  
  // Developer console warning text, copied from steemit/condenser console
  ConsoleWarning(){
    console.log("%c%s","color: red; background: yellow; font-size: 24px;","WARNING!");
    console.log("%c%s","color: black; font-size: 16px;",
    "This is a developer console, you must read and understand anything you paste or type here or you could compromise your account and your private keys.");
  }
}
