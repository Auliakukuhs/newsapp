import {Component, OnInit} from '@angular/core';
import {NewsApiService} from './services/news-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mArticles: Array<any>;
  mSources: Array<any>;
  classApplied = false;
  private category: any = 'Berita Terpopuler';
  private data: Array<any> = [];
  public page = 1;
  public itemsPerPage = 3;
  public config: any = {
    paging: true
  };
  public maxSize = 4;
  public numPages = 1;
  public rows: Array<any> = [];
  public length = 0;

  constructor(private newsApi: NewsApiService, private router: Router) {
  }

  ngOnInit() {
    this.router.navigate(['/']).then(r => '/');
    // load articles
    this.newsApi.initArticles().subscribe(data => {
      this.mArticles = data['articles'];
      for (let i = 0; i < this.mArticles.length; i++) {
        this.data.unshift(this.mArticles[+i]);
      }
      console.log(this.data)
      this.onChangeTable(this.config);
    });
    // load news sources
    this.newsApi.initSources().subscribe(data => this.mSources = data['sources']);
  }

  searchArticles(category) {
    console.log('selected source is: ' + category);
    this.category = category;
    this.newsApi.getArticlesByCategory(category).subscribe(data => {
      this.mArticles = data['articles'];
      for (let i = 0; i < this.mArticles.length; i++) {
        this.data.unshift(this.mArticles[+i]);
      }
      console.log(this.data)
      this.onChangeTable(this.config);
    });
  }

  searchSources(source) {
    console.log('selected source is: ' + source);
    this.category = source;
    this.newsApi.getArticlesBySources(source).subscribe(data => {
      this.mArticles = data['articles'];
      for (let i = 0; i < this.mArticles.length; i++) {
        this.data.unshift(this.mArticles[+i]);
      }
      console.log(this.data)
      this.onChangeTable(this.config);
    });
  }

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    this.rows = this.changePage(page, this.data);
    this.length = this.data.length;
  }
}
