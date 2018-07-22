import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// testing service
@Injectable({
  providedIn: 'root'
})
export class MyService {
  test = 'hello worldss';
  constructor(private _http : HttpClient) {
    // let getts = this._http.get('https://jsonplaceholder.typicode.com/posts/1');
    // getts.toPromise()
    // .then((data)=>console.log(data))
    // .catch(e=>console.log(e));
  }
}
