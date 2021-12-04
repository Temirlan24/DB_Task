import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { ICountry } from './ICountry';
import { ViewChild, ElementRef} from '@angular/core';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})

export class CountryComponent implements OnInit {
  @ViewChild('closeModal1')
  closeModal1!: ElementRef;
  @ViewChild('closeModal2')
  closeModal2!: ElementRef;
  country!: FormGroup;
  countries: ICountry[] = [];
  cname_id_:string;
  constructor(private service: CountryService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.refresh();
    this.country = this.formBuilder.group({
      cname: ['',Validators.required],
      population: [0, Validators.required]
    })
  }
  refresh() {
    this.service
      .getCountries().toPromise().then(
        (data: any) => {
          this.countries = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  edit(val:any){
    this.service.getCountryById(val).subscribe(
      (res)=>{
        this.country.patchValue({
          cname: res.cname, 
          population: res.population
        });
        this.cname_id_ = res.cname
      }, 
      (err)=>console.log(err)
    )
  }
  create(){
    if(!(this.countries.includes(this.country.controls["cname"].value))){
      this.service.createCountry({
        cname: this.country.controls["cname"].value,
        population: this.country.controls["population"].value
      }).toPromise().then(
        ()=>{
          this.closeModal2.nativeElement.click();
          this.refresh();
        },
        (err)=>console.log(err)
      )
    }
      else{
      alert("Please enter new country");
    }
    
  }
  delete(val:any){
    this.service.deleteCountry(val).toPromise().then(
      (res) => {
        this.countries = this.countries.filter((b) => b.cname !== val);
        this.refresh();
      },
      (err)=>console.log(err)
    )
  }
  saveChanges(){
    this.service.updateCountry({
      cname: this.country.controls["cname"].value,
      population: this.country.controls["population"].value
    }, this.cname_id_).toPromise().then(
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

