import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';


@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  query1: String;
  query2: String;
  url:any;
  url2:any;
  displaydata: any;
  maindata: any;
  querydata: any;
  abc: any;
  xyz: any;
  arr: any;
  hospital: any;
  walkin: any;
  vancouver: any;
  burnaby: any;
  surrey: any;
  langley: any;
  richmond : any;
  cardiology: any;
  neurology: any;
  general: any;
  dermatology: any
  dental:any;


  hospital_name: String;
  hospital_address: String;
  hospital_city: String;
  hospital_phone: Number;
  website_link: String;
  hospCheck: String;
  count:any =0;




showhide = false;
comparepressed= false;

  filtertoggle() {

    this.showhide = !this.showhide;


  }


  constructor(public dataService: DataService,public router: Router, public route: ActivatedRoute, public http: HttpClient) {

    // console.log(this.query2);
    this.query1 = '';
    this.query2 = '';
    // this.url = "http://localhost:3000/searchQuery";
    this.url = "http://hospicheck.jyotsarup.wmdd.ca/searchQuery";
    // this.url2 = "http://localhost:3000/searchQueryFilter";
    this.url2 = "http://hospicheck.jyotsarup.wmdd.ca/searchQueryFilter";
    this.maindata;
    this.hospCheck;
    this.querydata;

    this.hospital_name = '';
    this.hospital_address = '';

    this.hospital_city = '';

    this.hospital_phone;

    this.website_link = '';
    this.arr = [];
    // this.hospital = '';

   }

  ngOnInit() {

    if (window.matchMedia('(min-width: 810px)').matches) {
      this.showhide = true;
     }
      let query1 = this.route.snapshot.queryParamMap.get('searchinput');

      let query2 = this.route.snapshot.queryParamMap.get('searchcity');

      this.http.post(this.url,{searchinput:query1,searchcity:query2}).toPromise().then(data =>
      {

        this.maindata = data;

      });
    }

    //*******we could also pass the appended hospName as the div id*************//
    //****then every div will have the hospname as id and it will be easier to process further***//

    updateSearch(hospital: any, walkin: any,vancouver: any,burnaby: any,surrey: any,langley: any,cardiology: any,ent: any,gas: any,gynae: any,ortho:any)
    { 
      let obj1 =
      {
        hospital : hospital.checked,
        walkin : walkin.checked,
        vancouver : vancouver.checked,
        burnaby : burnaby.checked,
        surrey : surrey.checked,
        langley : langley.checked,
        // richmond : richmond.checked,
        cardiology : cardiology.checked,
        ent : ent.checked,
        gas : gas.checked,
        gynae : gynae.checked,
        ortho : ortho.checked,
        hospital1 : hospital.value,
        walkin1 : walkin.value,
        vancouver1 : vancouver.value,
        burnaby1 : burnaby.value,
        surrey1 : surrey.value,
        langley1 : langley.value,
        // richmond1 : richmond.value,
        cardiology1 : cardiology.value,
        ent1 : ent.value,
        gas1 : gas.value,
        gynae1 : gynae.value,
        ortho1 : ortho.value
      }
      
      this.hospCheck = hospital.checked;

      this.http.post(this.url2,obj1).toPromise().then(data=>{
        
        this.maindata = data;
        // console.log(data);
      });
    }

    addtocompare(cmp: String){
      
      this.comparepressed= true;
      
      if(this.count==0){
      this.abc= cmp;
      // console.log(this.abc);
      this.count++;
      }
      else if(this.count==1){
      this.xyz = cmp; 
      this.count = 0;
      }
      else{
        return false;
      }
      // this.count++;
    }

    
    compareData(){

      this.router.navigate(['/compare'], {queryParams: {hosp1: this.abc.textContent, hosp2:this.xyz.textContent, hospCheck1: this.hospCheck}});
      

      }

    }

