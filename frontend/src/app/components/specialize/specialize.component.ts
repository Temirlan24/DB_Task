import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecializeService } from 'src/app/services/specialize.service';
import { ISpecialize } from './ISpecialize';

@Component({
  selector: 'app-specialize',
  templateUrl: './specialize.component.html',
  styleUrls: ['./specialize.component.scss']
})
export class SpecializeComponent implements OnInit {
  @ViewChild('closeModal1')
  closeModal1!: ElementRef;
  @ViewChild('closeModal2')
  closeModal2!: ElementRef;
  specialize!: FormGroup;
  specializeArr: ISpecialize[] = []; 
  email_id:string;
  specialize_id:number;
  constructor(private specializeService: SpecializeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.specialize = this.formBuilder.group({
      id: [0, Validators.required],
      email: ['', Validators.required]
    })
    this.refresh();
  }
  refresh(){
    this.specializeService.getSpecialize().toPromise().then(
      (res:any)=>
      {
        this.specializeArr = res;
      },
      (err)=>
        {
          console.log(err);
        }
    )
  }
  edit(specialize_id:any, specialize_email:any){
    this.specializeService.getSpecializeByid(specialize_id, specialize_email).toPromise().then(
      (res)=>{
        this.specialize.patchValue({
          id: res.id, 
          email: res.email
        });
        this.specialize_id = res.id;
        this.email_id = res.email;
      }, 
      (err)=>console.log(err)
    ) 
  }
  create(){
      this.specializeService.createSpecialize({
        id: this.specialize.controls["id"].value,
        email: this.specialize.controls["email"].value
      }).toPromise().then(
        ()=>{
          this.closeModal2.nativeElement.click();
          this.refresh();
        },
        (err)=>console.log(err)
      )
    
  }
  delete(specialize_id:any, specialize_email:any){
    this.specializeService.deleteSpecialize(specialize_id, specialize_email).toPromise().then(
      (res) => {
        this.specializeArr = this.specializeArr.filter((b) => b.email !== specialize_email && b.id! == specialize_id);
        this.refresh();
      },
      (err)=>console.log(err)
    )
  }
  saveChanges(){
    this.specializeService.updateSpecialize(this.specialize_id, this.email_id,
    {
      id: this.specialize.controls["id"].value,
      email: this.specialize.controls["email"].value
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
