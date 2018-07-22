import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { HeadComponent } from '../head/head.component'
import { HttpClient } from '@angular/common/http'
import * as config from '../app.config'
import { SteemService } from '../services/steem.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers:[HeadComponent],
})
export class DashboardComponent implements OnInit {
	public User = () => this._head.User() // sc2.me
	public DynamicGlobalProperties // Received from the RPC node
	public json_meta = () => ( //json_metadata from sc2.me
		this.User() ?(
			this.User().account ?(
				this.User().account.json_metadata ?(
					this.User().account.json_metadata 
				)
			:null)
		:null)
	:null)
	public bandwidth = {
		bandwidth:'',
		bandwidth_percent:''
	}
  	// Constructor will run on component start
  	constructor(
		private _head:HeadComponent,
		private auth:AuthService,
		private _http:HttpClient,
		private steem:SteemService
	){
		this.GetDynamicGlobalProperties() //Getting from RPC node
	}
	public Profile_img = () => this._head.Profile_img()
	public isAuth = () => (this.auth.isAuth ? this.auth.isAuth : null)
  	GetDynamicGlobalProperties (){
		this._http.get(config.api.blockchain_apis.get_dynamic_global_properties)
		.toPromise()
		.then(
			result => this.DynamicGlobalProperties = result
		).catch(
			err => this.DynamicGlobalProperties = null
		)
  	}
  	Profile_name(){
		return (this.json_meta() ?(
			JSON.parse(this.json_meta()).profile.name ? JSON.parse(this.json_meta()).profile.name
			:null)
		:null)
	}
	Profile_about(){
		return (this.json_meta() ?(
			JSON.parse(this.json_meta()).profile.about ? JSON.parse(this.json_meta()).profile.about 
			:null)
		:null)
  	}
  	Profile_location() {
		return (this.json_meta() ?(
			JSON.parse(this.json_meta()).profile.location ? JSON.parse(this.json_meta()).profile.location 
			:null)
		:null)
  	}
  	Profile_website() {
		return (this.json_meta() ?(
			JSON.parse(this.json_meta()).profile.website ? JSON.parse(this.json_meta()).profile.website 
			:null)
		:null)
  	}
 	Profile_reputation () {
		return (
			this.steem.Reputaionformatter(this.User().account.reputation) ?
			 	this.steem.Reputaionformatter(this.User().account.reputation) :
			  null
		)
 	}
 	Profile_age(){
		return (this.User().account.created ? this.User().account.created : null)
 	}
	Profile_votingpower() {
		if(this.User()){
			let now = new Date()
			let n = now.getTime()/1000
			let last = new Date(this.User().account.last_vote_time+'Z')
			let l = last.getTime()/1000
			let power = this.User().account.voting_power/100 + ((n - l)/4320)
			let powernow = 100
			powernow = parseFloat(power.toFixed(2))
			if(powernow > 100){
				powernow = 100
			}
			return (powernow ? powernow : null)
		}
	}
	Profile_bandwidth (){
			this.GetUserBandwidth()
		return (this.bandwidth ? (this.bandwidth.bandwidth?this.bandwidth.bandwidth:null) : null)
	}
	Profile_bandwidthpercent(){
		if(this.DynamicGlobalProperties){
			this.GetUserBandwidth()
			return (this.bandwidth ? (this.bandwidth.bandwidth_percent?this.bandwidth.bandwidth_percent:null) :null)
		}else{
			return null
		}
	}
	// Bandwidth calculation from @neander-squirrel
	GetUserBandwidth(){
		const STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS = 60 * 60 * 24 * 7
		let vestingShares = parseFloat(this.User().account.vesting_shares.replace(' VESTS', ''))
		let receivedVestingShares = parseFloat(this.User().account.received_vesting_shares.replace(' VESTS', ''))
		let deleg = parseFloat(this.User().account.delegated_vesting_shares.replace(' VESTS', ''))
		let total_vesting_shares = (
			this.DynamicGlobalProperties.total_vesting_shares ?
			this.DynamicGlobalProperties.total_vesting_shares
		:null)
		if(total_vesting_shares){
			total_vesting_shares = parseFloat(total_vesting_shares.replace(' VESTS', ''))
			let max_virtual_bandwidth = parseInt(this.DynamicGlobalProperties.max_virtual_bandwidth, 10)
			let average_bandwidth = parseInt(this.User().account.average_bandwidth, 10)
			let delta_time = (new Date().getTime() - new Date(this.User().account.last_bandwidth_update + 'Z').getTime()) / 1000
			let bandwidthAllocated = (max_virtual_bandwidth * (vestingShares + receivedVestingShares-deleg) / total_vesting_shares)
			bandwidthAllocated = Math.round(bandwidthAllocated / 1000000)
			let new_bandwidth = 0
			if(delta_time < STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS) {
				new_bandwidth = (((STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS - delta_time) * average_bandwidth) / STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS)
			}
			new_bandwidth = Math.round(new_bandwidth / 1000000)
			this.bandwidth.bandwidth = ((bandwidthAllocated-new_bandwidth)/1024).toFixed(2)
			this.bandwidth.bandwidth_percent = (100 - (100 * new_bandwidth / bandwidthAllocated)).toFixed(2)
		}
	}
	Account_steem(){
		return (
			this.User() ?(
				this.User().account ?(
					this.User().account.balance ? this.User().account.balance 
					:null)
				:null)
			:null
		)
	}
	Account_sbd(){
		return (
			this.User() ?(
				this.User().account ?(
					this.User().account.balance ? this.User().account.sbd_balance 
					:null)
				:null)
			:null
		)
	}
	Account_sp(){
		if(this.User() && this.User().account && this.DynamicGlobalProperties){
			let delegated = parseInt(this.User().account.delegated_vesting_shares.replace("VESTS","")) // VESTS
			let received = parseInt(this.User().account.received_vesting_shares.replace("VESTS","")) // VESTS
			let vesting = parseInt(this.User().account.vesting_shares.replace("VESTS","")) // VESTS
			//let totalvest = vesting + received - delegated
			let t = this.DynamicGlobalProperties
			let tvfs = parseInt(t.total_vesting_fund_steem.replace("STEEM",""))
			let tvs = parseInt(t.total_vesting_shares.replace("VESTS",""))
			let sp = (vesting * (tvfs/tvs)).toFixed(3).toString() // SP balance
			let spr = (received * (tvfs/tvs)) // SP received
			let spd = (delegated * (tvfs/tvs)) // SP delegated
			return (sp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") 
			+" STEEM ("+ (spr - spd).toFixed(3))+")"
		}
	}
  	ngOnInit(){}
}
