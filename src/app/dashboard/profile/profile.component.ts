import { Component, OnInit } from '@angular/core'
import { DashboardComponent } from '../dashboard.component'

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public dash:DashboardComponent) { }
  ngOnInit() {
  }

}
