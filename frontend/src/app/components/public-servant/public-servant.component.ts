import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicServantService } from 'src/app/services/public-servant.service';
import { IPublicServant } from './IPublicServant';

@Component({
  selector: 'app-public-servant',
  templateUrl: './public-servant.component.html',
  styleUrls: ['./public-servant.component.scss']
})
export class PublicServantComponent implements OnInit {
  @ViewChild('closeModal1')
  closeModal1!: ElementRef;
  @ViewChild('closeModal2')
  closeModal2!: ElementRef;
  publicServants!: FormGroup;
  publicServantArr: IPublicServant[] = [];
  public_servant_id:string;
  constructor(private publicServantService: PublicServantService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.refresh();
    this.publicServants = this.formBuilder.group({
      email: ['', Validators.required],
      department: ['', Validators.required]
    })
  }
  refresh() {
    this.publicServantService.getPublicServant().toPromise().then(
        (data: any) => {
          this.publicServantArr = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  edit(val:any){
    this.publicServantService.getPublicServantById(val).subscribe(
      (res)=>{
        this.publicServants.patchValue({
          email: res.email, 
          department: res.department
        });
        this.public_servant_id = res.email;
      }, 
      (err)=>console.log(err)
    )
  }
  create(){
      this.publicServantService.createPublicServant({
        email: this.publicServants.controls["email"].value,
        department: this.publicServants.controls["department"].value
      }).toPromise().then(
        ()=>{
          this.closeModal2.nativeElement.click();
          this.refresh();
        },
        (err)=>console.log(err)
      )
    
  }
  delete(val:any){
    this.publicServantService.deletePublicServant(val).toPromise().then(
      (res) => {
        this.publicServantArr = this.publicServantArr.filter((b) => b.email !== val);
      },
      (err)=>console.log(err)
    )
  }
  saveChanges(){
    this.publicServantService.updatePublicServant({
      email: this.publicServants.controls["email"].value,
      department: this.publicServants.controls["department"].value
    }, this.public_servant_id).toPromise().then(
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
