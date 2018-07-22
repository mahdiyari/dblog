import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import * as config from '../app.config.js'
import { HttpClient } from '@angular/common/http'
import { SteemService } from '../services/steem.service'
import extractDescription from '../utils/ExtractDescription'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  // We will extract username from the url which is provided like: /@username
  // Then we will display posts which are returned from api by HttpClient
  public user
  public posts = []
  public content = {}
  public isSynced
  public startPost = 0
  public endPost = config.blog.postsPerPage
  public postsPerPage = config.blog.postsPerPage
  public page = 1
  constructor(
    private route:ActivatedRoute,
    private _http:HttpClient,
    private steem:SteemService
  ) {
    let userRegex = /^[\@]+[a-zA-Z0-9\-\.]+$/;
    let path = route.snapshot.url[0].path.match(userRegex)[0]
    this.user = path.replace('@','')
    this.getBlogPosts(this.user)
  }

  notFound() {
    if (this.isSynced){
      if (this.isSynced === 'not found') return true
      else return false
    }
    return false
  }

  syncing() {
    if (this.isSynced){
      if (this.isSynced === 'syncing') return true
      else return false
    }
    return false
  }

  badsync() {
    if (this.isSynced){
      if (this.isSynced === 'bad sync') return true
      else return false
    }
    return false
  }

  printPostContent = (author, permlink ,postid) => {
    if (!this.content[postid]) this.getPostContent(author, permlink, postid)
    return (
      {
       image: this.content[postid] ? this.content[postid].image : null,
       title: this.content[postid] ? this.content[postid].title : null,
       value: this.content[postid] ? this.content[postid].value : null,
       votes: this.content[postid] ? this.content[postid].votes : null,
       desc: this.content[postid] ? extractDescription(this.content[postid].body) : null
      }
    )
  }

  pages() {
    return (this.posts ? new Array(Math.trunc(this.posts.length/config.blog.postsPerPage)):[])
  }

  changePage(value) {
    value = value.target ? value.target.value : value
    if (value === 1) {
      this.startPost = 0
      this.endPost = config.blog.postsPerPage
      this.page = 1
    } else {
      this.startPost = (value - 1) * config.blog.postsPerPage
      this.endPost = this.startPost + config.blog.postsPerPage
      this.page = value
    }
    window.scrollTo(0, 0)
  }

  getBlogPosts(user) {
    this._http.post(
      config.api.posts.getBlogPosts,
      {
        id: 1,
        user
      }
    ).toPromise()
    .then((posts:any) => {
      if (posts['result'] && posts['result'] === 'syncing') {
        this.isSynced = 'syncing'
      } else if (posts['result'] && posts['result'] === 'not found') {
        this.isSynced = 'not found'
      } else if (posts['result'] && posts['result'] === 'bad sync') {
        this.isSynced = 'bad sync'
      } else {
        this.posts = posts
      }
    })
  }

  getPostContent(author, permlink, postid) {
    Object.defineProperty(
      this.content, postid,{value:{image:'', title:'', body:''},writable:true}
    )
    this.steem.call(
      'call',
      [
        'database_api',
        'get_content',
        [author, permlink]
      ]
    )
      .then(result => {
        result = result['result']
        let metadata = JSON.parse(result['json_metadata'])
        let image = metadata ? (metadata['image'] ? metadata['image'][0] : null) : null
        this.content[postid].image = image ?
          'https://steemitimages.com/256x512/'+image
          : config.img.defaultPostImg
        this.content[postid].title = result['title']
        let value = parseFloat(result['total_payout_value']) +
          parseFloat(result['pending_payout_value']) +
          parseFloat(result['curator_payout_value'])
        this.content[postid].value = '$'+value.toFixed(3)
        let tshares = 0
        for (let vote of result['active_votes']) {
          tshares = tshares + parseInt(vote['rshares'])
        }
        let spr = value / tshares
        let votes = result['active_votes'].map(vote => {
          return {
            voter: vote['voter'],
            value: ((vote['rshares']*spr).toFixed(2))
          }
        })
        votes.sort((a, b) => {return a['value'] - b['value']})
        votes.reverse((a, b) => {return a['value'] - b['value']})
        this.content[postid].votes = votes.slice(0,10)
        this.content[postid].body = result['body']
      })
  }

  ngOnInit() {
  }

}
