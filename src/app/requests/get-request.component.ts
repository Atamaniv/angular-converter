import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpClient } from '@angular/common/http';

interface T {
    ccy:string,
    base_ccy:string,
    buy:number,
    sale:number
}

@Component({ selector: 'get-request', templateUrl: './get-request.component.html' })

export class GetRequestComponent implements OnInit {
    dataFromPrivatBank:{   
        ccy:string,
        base_ccy:string,
        buy:number,
        sale:number}[]=[];
    requestResult:string='';
    
    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get<any>('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11').subscribe(data => {
            this.dataFromPrivatBank = data;
            this.dataFromPrivatBank.forEach((entry:T)=>{
                this.dataFromPrivatBank.push({ 
                    ccy:entry.base_ccy, 
                    base_ccy:entry.ccy, 
                    buy:Number( (1/entry.sale).toFixed(10)), 
                    sale:Number( (1/entry.buy).toFixed(10))
                    })
            });

            this.requestResult = JSON.stringify(data, null, 2)
            this.setData()
        })        
    }

    @Output() newDataEvent = new EventEmitter<any>();
    setData() {        
        this.newDataEvent.emit(this.dataFromPrivatBank);        
    }
}