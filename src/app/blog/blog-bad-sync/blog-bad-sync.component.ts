import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-bad-sync',
  templateUrl: './blog-bad-sync.component.html',
  styleUrls: ['./blog-bad-sync.component.css']
})
export class BlogBadSyncComponent implements OnInit {
  @Input() user
  constructor() { }

  ngOnInit() {
  }

}
