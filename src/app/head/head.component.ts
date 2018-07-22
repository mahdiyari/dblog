import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import * as config from '../app.config'

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  public Nav_logo_image = '/assets/img/logo1.png'
  
  constructor(private auth:AuthService) {
    
  }
  // Check if user is logged in
  public isAuth(){
    return (this.auth.isAuth ? this.auth.isAuth : null)
  }
  // Retrun user information
  public User(){
    return (this.auth.user ? this.auth.user : null)
  }
  // Return profile image
  public Profile_img() {
    let metadata = this.User().account.json_metadata ? this.User().account.json_metadata : null
    let img = metadata ? JSON.parse(metadata).profile.profile_image : null
    img = img ? config.img.proxy+'/250x250/'+img : null
    return img ? img : config.img.defaultAvatar
  }
  // Redirect to steemconnect
  public Login() {
    window.location.href = this.auth.api.getLoginURL()
  }
  ngOnInit() {
  }

}
