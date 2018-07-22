const config = new function () {
  this.sc2 = {
    app: 'steem.app',
    // url: 'https://dev.onsteem.com',
    url: 'http://localhost:4200',
    scope: ['login']
  }
  this.api = {}
  this.api.url = 'http://127.0.0.1:4939'
  this.api.blockchain_apis = {
    get_dynamic_global_properties: `${this.api.url}/api/database/get_dynamic_global_properties`
  }
  this.api.login_apis = {
    confirm_process: `${this.api.url}/api/login/confirm_process`
  }
  this.api.posts = {
    getBlogPosts: `${this.api.url}/api/posts/getBlogPosts`
  }
  this.rpc = {
    https: 'https://api.onsteem.com'
  }
  this.img = {
    proxy: 'https://steemitimages.com',
    defaultAvatar: '/assets/img/default_avatar.png',
    defaultPostImg: '/assets/img/default_post_img.png'
  }
  this.blog = {
    postsPerPage: 12
  }
}()
module.exports = config
