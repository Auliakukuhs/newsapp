import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  api_key = '81a2290aa56b4d8589ff618733779633';

  constructor(private http:HttpClient) { }

  initSources(){
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey='+this.api_key);
  }
  initArticles(){
    return this.http.get('https://newsapi.org/v2/top-headlines?country=id&pageSize=6&apiKey='+this.api_key);
  }
  getArticlesByCategory(category: String){
    return this.http.get('http://newsapi.org/v2/top-headlines?country=id&category='+category+'&apiKey='+this.api_key);
  }

  getArticlesBySources(source: String){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.api_key);
  }
}
