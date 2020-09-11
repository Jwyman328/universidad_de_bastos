import { Component, OnInit } from '@angular/core';
import { articleData } from '../../data/articleData';

@Component({
  selector: 'app-articles-center',
  templateUrl: './articles-center.component.html',
  styleUrls: ['./articles-center.component.scss']
})
export class ArticlesCenterComponent implements OnInit {
  articles = articleData;
  constructor() { }

  ngOnInit(): void {
  }

}
