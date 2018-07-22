import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-notfound',
  templateUrl: './blog-notfound.component.html',
  styleUrls: ['./blog-notfound.component.css']
})
export class BlogNotfoundComponent implements OnInit {
  @Input() user
  constructor() { }

  ngOnInit() {
  }

}
