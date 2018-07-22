import { Component, OnInit, Input } from '@angular/core';
import { BlogComponent } from '../blog.component';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  @Input() post
  @Input() printPostContent:Function
  constructor(
    public _blog:BlogComponent
  ) { }

  ngOnInit() {
  }

}
