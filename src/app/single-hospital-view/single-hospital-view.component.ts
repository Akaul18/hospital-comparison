import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-single-hospital-view',
  templateUrl: './single-hospital-view.component.html',
  styleUrls: ['./single-hospital-view.component.scss']
})
export class SingleHospitalViewComponent implements OnInit {

  hospName: any;
  // hospAddr:any;
  // phone:any;
  // website:any;
  // department:any;
  mainData: any;
  url: any;
  constructor(public router: Router, public route: ActivatedRoute, private http: HttpClient) {

    // this.url = "http://localhost:3000/querySearch/singleHospital";
    this.url = "http://operator.ankurkaul.com/hospicheck/querySearch/singleHospital";
    // this.url = "http://hospicheck.jyotsarup.wmdd.ca/querySearch/singleHospital";
    // this.department = [];
  }

  async ngOnInit() {
    this.hospName = this.route.snapshot.queryParamMap.get('hospName');
    // this.hospAddr = this.route.snapshot.queryParamMap.get('hospAddr');
    // this.phone = this.route.snapshot.queryParamMap.get('phone');
    // this.website = this.route.snapshot.queryParamMap.get('website');
    // this.department = this.route.snapshot.queryParamMap.get('department');
    // console.log(this.depts.department);
    await this.http.post(this.url, { hospName: this.hospName }).toPromise().then(data => {
      // console.log(data);
      this.mainData = data;
    });
  }

}
