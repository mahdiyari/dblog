import { Component, OnInit, Input } from '@angular/core'
import { SteemService } from '../../services/steem.service'
import * as config from '../../app.config'

@Component({
  selector: 'app-blog-user-info',
  templateUrl: './blog-user-info.component.html',
  styleUrls: ['./blog-user-info.component.css']
})
export class BlogUserInfoComponent implements OnInit {
  @Input() user
  public userInfo:any
  constructor(
    private steem:SteemService
  ) {
    
  }
  printUserInfo() {
    if (this.user && !this.userInfo) this.getUserInfo()
    let proxy = config.img.proxy+'/256x256/'
    let avatar
    let metadata
    let publicName
    let about
    if (
      this.userInfo['json_metadata'] &&
      JSON.parse(this.userInfo['json_metadata'])['profile']
    ) {
      metadata = JSON.parse(this.userInfo['json_metadata'])
      let profile = metadata['profile'] ? metadata['profile'] :null
      avatar = profile ? (
          profile['profile_image'] ?
            profile['profile_image']
            :null
        ) :null
      publicName = profile ? (
        profile['name'] ?
          profile['name']
          :null
      ) :null
      about = profile ? (
        profile['about'] ?
          profile['about']
          :null
      ) :null
    }
    avatar = avatar ? proxy + avatar : config.img.defaultAvatar
    
    return {
      avatar,
      reputation: '',
      publicName,
      about
    }
  }
  getUserInfo() {
    if (!this.userInfo) {
      this.userInfo = true
      this.steem.call(
        'call',
        [
          'database_api',
          'get_accounts',
          [
            [this.user]
          ]
        ]
      ).then(result => {
        this.userInfo = result['result'][0]
      }).catch(err => console.log(err))
    }
  }
  ngOnInit() {
  }

}
