import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  query1: String;
  query2: String;
  url: any;
  postData: any;
  hospNames: any;
  mainData: any;
  imagePath: any;
  abc() {

    return "hello";
  }

  constructor(private http: HttpClient, public router: Router, public dataService: DataService) {
    this.query1 = '';
    this.query2 = '';
    this.mainData = [];
    this.imagePath = [];
    // this.url = "http://localhost:3000/searchQuery";
    this.url = "http://operator.ankurkaul.com/hospicheck/searchQuery";
  }

  post() {

    if (this.query2 == "" || this.query2 == "null") {
      console.log("City is empty");
      return false;
    }

    this.http.post(this.url, { searchinput: this.query1, searchcity: this.query2 }).toPromise().then(data => {
      this.router.navigate(['/advanced-search'], { queryParams: { searchinput: this.query1, searchcity: this.query2 } });
    });

  }

  async singleView(hospName: any) {
    await this.router.navigate(['/single-hospital-view'], { queryParams: { hospName: hospName } });
  }

  async ngOnInit() {
    this.hospNames = await this.http.get(this.url).toPromise().then((data) => {

      console.log(data);
      this.mainData = data;
    });
  }
}



