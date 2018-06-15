import { Component, OnInit } from '@angular/core';
import { HeadComponent } from '../head/head.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HeadComponent]
})
export class HomeComponent implements OnInit {
  public Home_logo_img = '/assets/img/logo1.png';
  public isAuth = () => this._head.isAuth();
  constructor(private _head:HeadComponent) { }

  ngOnInit() {
  }

}
