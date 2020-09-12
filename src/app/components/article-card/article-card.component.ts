import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  @Input('articleData') articleData;
  articleCategoriesString:string;


  constructor() { }

  ngOnInit(): void {

     this.articleCategoriesString = this.articleData.categories.join(', ')

  }

  openArticle(){
    window.open(this.articleData.url)
  }




}
