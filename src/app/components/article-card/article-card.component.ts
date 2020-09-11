import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  articleData = {url:'https://www.mises.org.es/2013/11/un-reaccionario-radical-el-pensamiento-politico-de-murray-n-rothbard/' , imageUrl:'https://www.mises.org.es/wp-content/uploads/2013/11/closeup.jpg', title:'Un reaccionario radical: El pensamiento político de Murray N. Rothbard', date: new Date(2013,11,23),categories:['Economia','Estado'], author:'Miguel Anxo Bastos'}
  articleCategoriesString:string;
  constructor() { }

  ngOnInit(): void {
     this.articleCategoriesString = this.articleData.categories.join(', ')
  }

  openArticle(){
    window.open(this.articleData.url)
  }

}
