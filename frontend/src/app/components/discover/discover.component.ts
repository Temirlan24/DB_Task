import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { DiscoverService } from 'src/app/services/discover.service';
import { IDiscover } from './IDiscover';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  @ViewChild('closeModal1')
  closeModal1: ElementRef;
  @ViewChild('closeModal2')
  closeModal2: ElementRef;
  discover: FormGroup;
  discoveries: IDiscover[] = [];
  countries = [];
  post: any;
  
  cname_id_:string;
  disease_code_id:string;

  constructor(private countryService: CountryService, 
              private discoverService: DiscoverService, 
              private formBuilder: FormBuilder,
              private datePipe: DatePipe
              ) { }

  ngOnInit(): void {
    this.refresh();
    this.discover = this.formBuilder.group({
      cname: ['', Validators.required],
      disease_code: ['', Validators.required],
      first_enc_date: ['', Validators.required],
    })
    this.countryService.getCountries().toPromise().then((result:any) => {
      this.countries = result;
    }).catch((err) => {
      console.log(err);
    });
  }
  refresh() {
    this.discoverService.getDiscoveries().toPromise().then(
        (data: any) => {
          this.discoveries = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  edit(cname_id: any, disease_code_id: any){
    this.discoverService.getDiscoverById(cname_id, disease_code_id).subscribe(
      (res)=>{
        console.log("Res", res);
        let myDate = this.datePipe.transform(res.first_enc_date, 'dd/MM/yyyy');
        console.log(myDate)
        this.discover.patchValue({
          cname: res.cname, 
          disease_code: res.disease_code,
          first_enc_date: myDate
        });
        console.log(this.discover)
        this.cname_id_ = res.cname;
        this.disease_code_id = res.disease_code
      }, 
      (err)=>console.log(err)
    )
  }
  create(){
      this.discoverService.createDiscover({
        cname: this.discover.controls["cname"].value,
        disease_code: this.discover.controls["disease_code"].value,
        first_enc_date: this.discover.controls["first_enc_date"].value
      }).toPromise().then(
        ()=>{
          this.closeModal2.nativeElement.click();
          this.refresh();
        },
        (err)=>console.log(err)
      )
    
  }
  delete(cname_id: any, disease_code_id: any){
    this.discoverService.deleteDiscover(cname_id, disease_code_id).toPromise().then(
      (res) => {
        this.discoveries = this.discoveries.filter((b) => b.cname !== cname_id && b.disease_code !== disease_code_id);
      },
      (err)=>console.log(err)
    )
  }
  saveChanges(){
    this.discoverService.updateDiscover(
      this.cname_id_, this.disease_code_id,
      {
      cname: this.discover.controls["cname"].value,
      disease_code: this.discover.controls["disease_code"].value,
      first_enc_date: this.discover.controls["first_enc_date"].value
    }).toPromise().then(
      ()=>{
        this.refresh();
        this.closeModal1.nativeElement.click();
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
