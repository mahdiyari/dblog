import { Component } from '@angular/core';
import { MyService } from './my.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Our bigg!';
  constructor(public _myService:MyService){
    console.log(_myService.test);
  }
  ngOnInit(){
    console.log('initied');
  }
}
