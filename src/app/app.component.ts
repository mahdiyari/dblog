import { Component } from '@angular/core'
import { MyService } from './services/my.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public _myService:MyService){
    console.log(_myService.test)
  }
  ngOnInit(){
    console.log('initied')
  }
}
