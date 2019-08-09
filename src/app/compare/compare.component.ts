import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { json } from 'd3';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

query1: String;
query2: String;
hospCheck: String;
maindata: any;
url:any;


  constructor(public router: Router, public route: ActivatedRoute, public http: HttpClient) {

    this.query1= '';

    this.query2= '';
    this.hospCheck = '';
    this.maindata='';
    this.url = 'http://hospicheck.jyotsarup.wmdd.ca/searchQuery2';
   }

   compareTable: boolean;
   barGraph: boolean;
  ngOnInit() {

   this.compareTable= true;
    this.barGraph = false;
    
    let query1 = this.route.snapshot.queryParamMap.get('hosp1');

    let query2 = this.route.snapshot.queryParamMap.get('hosp2');

    let hospCheck = this.route.snapshot.queryParamMap.get('hospCheck1');
    console.log(hospCheck);
    
    if(hospCheck == null){

        hospCheck = "true";
    }
    else{
    
      hospCheck = this.route.snapshot.queryParamMap.get('hospCheck1').toString();

    }
    // console.log(hospCheck);
 
    this.http.post(this.url, {searchcity1: query1.toString(), searchcity2: query2.toString(), hospCheck: hospCheck}).toPromise().then(data=>{

    console.log(hospCheck);  
    this.maindata = data;
    
    })
    


  }
  // count=0;
  
  public count =0
  displayData1() {

    
    this.compareTable = true;
    this.barGraph = false; 

    if(this.count>0){


      rectCanvas.parentNode.removeChild(rectCanvas);
      this.count=0;
      

    }

    // this.count=1;


    // if(this.count=0){
    // rectCanvas.parentNode.removeChild(rectCanvas);
    // this.count = 1;
    // }
    

    
    
  }

  displayData2(){
    
    // this.count = 1;
    // this.count+=1;
    
    this.barGraph = true;
    this.compareTable = false;
// if(this.count===1){
  if(this.count==0){    
    this.d3view();
    this.count++;
    }

    
    // this.count=0;
  // }
  }

/************D3 code */


d3view() {

if(this.count % 2 == 0)
{
  let margin = {
      left: 150,
      right: 100,
      top: 10,
      bottom: 130
  };
  let cwidth = 500 - margin.left - margin.right;
  let cHeight = 400 - margin.top - margin.bottom;

  let scale = d3.scaleLinear() 
    .domain([0,5]) 
    .range([cHeight, 0]);
    
    this.maindata.sort((obj1, obj2)=>{
        return obj1.rating - obj2.rating;
    })

  let bscale = d3.scaleBand()
      .domain(this.maindata.map((maindata,i)=>{
        if(this.maindata[i].hospName){
          return this.maindata[i].hospName;
        }
        else{
          return this.maindata[i].clinicName;
        }
      }))
      .range([0,cwidth])
      .paddingInner(0.3)
      .paddingOuter(0.4);

  let xAxis = d3.axisBottom(bscale);

  let yAxis = d3.axisLeft(scale)
      .ticks(this.maindata.rating)
      .tickFormat((d)=>{
        return d + " star";
      });    

  let svg = d3.select('.Main-Compare')
    .append('svg')
        .attr('id','rectCanvas')
        .attr('width', cwidth+margin.left+margin.right)
        .attr('height', '480px')
        .style('margin-top','2rem');
    
  // console.log(this.maindata);
        
    let g = svg.append("g")     
            .attr("transform", `translate(${ margin.left }, ${margin.top})`);

    g.append('g')
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${ cHeight })`)
      .call(xAxis)
      .selectAll("text")
        .attr("x", "-5")
        .attr("y", "10")
        .attr("text-anchor", "end")
        .attr("font-size", "14px")
        .attr("transform", "rotate(-40)");


    g.append('g')
        .attr("class", "y-axis")
          .call(yAxis);  
          
    g.append('text')
      .attr("class", "x-axis-label")
      .attr("x", cwidth/2 + 180)   
      .attr("y", cHeight + 50)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Hospital/Clinic Name");
      
    g.append('text')
      .attr("class", "y-axis-label")
      .attr("x", -(cHeight/2))   
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Rating");

    let rects = g.selectAll('rect')
        .data(this.maindata);

    rects.enter()
        .append('rect')
            .attr('x', (maindata,i)=>{
              if(this.maindata[i].hospName){
              return bscale(this.maindata[i].hospName);
              }
              else{
                return bscale(this.maindata[i].clinicName);
                }
            })
            .attr('y', (maindata,i)=>{
              return scale(this.maindata[i].rating);
              })
            .attr('width',bscale.bandwidth)
            .attr('height', (maindata,i)=>{
              return cHeight - scale(this.maindata[i].rating);
            })
            // .attr('fill','orangered');      
            .attr('fill','yellowgreen');      
    this.count+=1;
    }
  }
}
