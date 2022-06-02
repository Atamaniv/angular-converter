import { Component, Input, SimpleChanges } from '@angular/core';

interface T {
  ccy:string,
  base_ccy:string,
  buy:number,
  sell:number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {  
  title = 'Angular converter currencies';  
  selectedOptionFrom: string;
  selectedOptionTo: string;
  sum:number;  
  sum2:number;
  name: string='';
  dataFromPrivatBankInApp:any;
  oneFromPrivatBankInApp:any;
  factor:number=1;
  check:string = 'buy';
  buy:number=0;
  sale:number=0;
  
  options = [
    { name: "UAH" },
    { name: "USD" },
    { name: "EUR" },
    { name: "RUR" },
    { name: "BTC" },
  ]  
  
  constructor(){ 
    this.selectedOptionFrom='USD'
    this.selectedOptionTo='UAH'
    this.sum = 100
    this.sum2 = 0
  }
  getDataFromHTTPRequest(data: any) {
    this.dataFromPrivatBankInApp=data;    
    this.calculate(1,100);
  }
  checkCheckBoxValue(){
    if (this.check==='buy') 
      this.check='sale';
    else
      this.check='buy';
      this.calculate(1,this.sum)
  }

  calculate(id:number, value:number){
    if (id==1) 
      this.sum = value
    else 
      this.sum2 = value 
    if (this.dataFromPrivatBankInApp){
      if (this.selectedOptionFrom === this.selectedOptionTo) {
        this.sum2=this.sum
        this.buy=1
        this.sale=1
      } 
      else
      {
        var filterArr = this.dataFromPrivatBankInApp
          .filter((item:T)=>  
            (item.ccy.toString()===this.selectedOptionFrom.toString() && 
            item.base_ccy.toString()===this.selectedOptionTo.toString()) 
        )
        this.oneFromPrivatBankInApp=filterArr;
        if (this.oneFromPrivatBankInApp[0]!==undefined)
        {
          this.buy = this.oneFromPrivatBankInApp[0]["buy"];
          this.sale = this.oneFromPrivatBankInApp[0]["sale"]; 
          if (id==1) {              
            this.sum2=Number((value * 
              this.oneFromPrivatBankInApp[0][this.check]).toFixed(10));
          }
          else {
            this.buy = 0;
            this.sale = 0; 
            this.sum=Number((value / 
            this.oneFromPrivatBankInApp[0][this.check]).toFixed(10));
          }
        }
        else{
          this.buy=0
          this.sale=0
        }
      }
    }
  }

  onSum(event:any){ 
    this.calculate(event.target.id,event.target.value);
  }
  onSelectCurrency(){
    this.calculate(1,this.sum);
  }
}
