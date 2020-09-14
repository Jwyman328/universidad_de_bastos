import { Component, OnInit } from '@angular/core';
import { articleData } from '../../data/articleData';
import { ArticlesService } from 'src/app/services/http-requests/articles.service';

@Component({
  selector: 'app-articles-center',
  templateUrl: './articles-center.component.html',
  styleUrls: ['./articles-center.component.scss']
})
export class ArticlesCenterComponent implements OnInit {
  articles = articleData;

  dateOptions = [
    { displayName: 'Nuevo', value: 'newest' },
    { displayName: 'Viejo', value: 'oldest' },
  ];

  selectedDateSort: { value: 'newest' } | { value: 'oldest' } = {
    value: 'newest',
  };

  sortedAndFilteredArticleData;
  isVideosLoading=true;


  constructor(private articlesService:ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((articles)=>{
      this.convertDateToJsDate(articles)
      this.sortByDate(this.selectedDateSort)
      this.isVideosLoading = false
    })
  }

  convertDateToJsDate(articles){
    const articlesWithJsDate = articles.map((article) => {
      article.date = new Date(article.date)
      return article
    })
    this.articles = articlesWithJsDate
    this.sortedAndFilteredArticleData = articlesWithJsDate
  }

  setDateSort(dateSort) {
    this.selectedDateSort = dateSort;

    this.sortByDate(this.selectedDateSort);
  }

  sortByDate(sortType) {
    let softTypeValue = sortType;
    if (sortType.value) {
      softTypeValue = sortType.value;
    }

    this.selectedDateSort = softTypeValue;
    const booksSortedByDate = [...this.sortedAndFilteredArticleData];
    booksSortedByDate.sort((a, b) => a.date - b.date);
    if (softTypeValue === 'newest') {
      booksSortedByDate.reverse();
    }
    this.sortedAndFilteredArticleData = booksSortedByDate;
  }

}
