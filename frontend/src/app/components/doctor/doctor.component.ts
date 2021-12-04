import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild, ElementRef} from '@angular/core';
import { IDoctor } from './IDoctor';
import { DoctorService } from 'src/app/services/doctor.service';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  @ViewChild('closeModal1')
  closeModal1!: ElementRef;
  @ViewChild('closeModal2')
  closeModal2!: ElementRef;
  doctor!: FormGroup;
  doctors: IDoctor[] = [];
  doctor_id:string;

  constructor(private doctorService: DoctorService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.refresh();
    this.doctor = this.formBuilder.group({
      email: ['', Validators.required],
      degree: ['', Validators.required]
    })
  }
  refresh() {
    this.doctorService
      .getDoctors().toPromise().then(
        (data: any) => {
          this.doctors = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  edit(val:any){
    this.doctorService.getDoctorById(val).subscribe(
      (res)=>{
        console.log("doc", res)
        this.doctor.patchValue({
          email: res.email, 
          degree: res.degree
        });
        this.doctor_id = res.email;
      }, 
      (err)=>console.log(err)
    )
  }
  create(){
      this.doctorService.createDoctor({
        email: this.doctor.controls["email"].value,
        degree: this.doctor.controls["degree"].value
      }).toPromise().then(
        ()=>{
          this.closeModal2.nativeElement.click();
          this.refresh();
        },
        (err)=>console.log(err)
      )
    
  }
  delete(val:any){
    this.doctorService.deleteDoctor(val).toPromise().then(
      (res) => {
        this.doctors = this.doctors.filter((b) => b.email !== val);
      },
      (err)=>console.log(err)
    )
  }
  saveChanges(){
    this.doctorService.updateDoctor({
      email: this.doctor.controls["email"].value,
      degree: this.doctor.controls["degree"].value
    }, this.doctor_id).toPromise().then(
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
