import { Component, OnInit, Input } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-dashboard-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [DashboardComponent]
})
export class InfoComponent implements OnInit {

  constructor(public dash:DashboardComponent) {}

  ngOnInit() {
  }

}
