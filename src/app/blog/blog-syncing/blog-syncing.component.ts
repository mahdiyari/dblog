import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-syncing',
  templateUrl: './blog-syncing.component.html',
  styleUrls: ['./blog-syncing.component.css']
})
export class BlogSyncingComponent implements OnInit {
  @Input() user
  constructor() { }

  ngOnInit() {
  }

}
