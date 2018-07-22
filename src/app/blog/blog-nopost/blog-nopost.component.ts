import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-nopost',
  templateUrl: './blog-nopost.component.html',
  styleUrls: ['./blog-nopost.component.css']
})
export class BlogNopostComponent implements OnInit {
  @Input() user
  constructor() { }

  ngOnInit() {
  }

}
