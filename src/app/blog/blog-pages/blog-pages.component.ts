import { Component, OnInit, Input } from '@angular/core'
import { BlogComponent } from '../blog.component'

@Component({
  selector: 'app-blog-pages',
  templateUrl: './blog-pages.component.html',
  styleUrls: ['./blog-pages.component.css']
})
export class BlogPagesComponent implements OnInit {
  
  constructor(
    public _blog:BlogComponent
  ) { }

  ngOnInit() {
  }

}
