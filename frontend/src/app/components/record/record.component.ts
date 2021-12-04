import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecordService } from 'src/app/services/record.service';
import { IRecord } from './IRecord';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  @ViewChild('closeModal1')
  closeModal1!: ElementRef;
  @ViewChild('closeModal2')
  closeModal2!: ElementRef;
  record!: FormGroup;
  records: IRecord[] = []; 
  email_id_:string;
  cname_id_:string;
  disease_code_id_:string;

  constructor(private recordService: RecordService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.refresh();
    this.record = this.formBuilder.group({
      email: ['',Validators.required],
      cname:['',Validators.required],
      disease_code: ['',Validators.required],
      total_death: [0, Validators.required],
      total_patients: [0, Validators.required]
    })
  }
  refresh() {
    this.recordService
      .getRecords().toPromise().then(
        (data: any) =>
          this.records = data,
        (err) => {
          console.error(err);
        }
      );
  }
  edit(email_id: any, cname_id: any, disease_code_id: any){
    this.recordService.getRecordByid(email_id, cname_id, disease_code_id).subscribe(
      (res)=>{
        this.record.patchValue({
          email: res.email,
          cname: res.cname,
          disease_code: res.disease_code,
          total_death: res.total_death,
          total_patients: res.total_patients
        });
        this.email_id_ = res.email;
        this.cname_id_ = res.cname;
        this.disease_code_id_ = res.disease_code;
        console.log("edit", res);
      }, 
      (err)=>console.log(err)
    )
  }
  create(){
    if(!this.records.find(x=> x === this.record.controls["email"].value)){
      this.recordService.createRecord({
        email: this.record.controls["email"].value,
        cname: this.record.controls["cname"].value,
        disease_code: this.record.controls["disease_code"].value,
        total_death: this.record.controls["total_death"].value,
        total_patients: this.record.controls["total_patients"].value
      }).toPromise().then(
        ()=>{
          this.closeModal2.nativeElement.click();
          this.refresh();
        },
        (err)=>console.log(err)
      )
    }
      else{
      alert("Please enter new email");
    }
  }
  delete(email_id: any, cname_id: any, disease_code_id: any){
    this.recordService.deleteRecord(email_id,cname_id, disease_code_id).toPromise().then(
      (res) => {
        this.records = this.records.filter((b) => b.email !== email_id && b.cname !== cname_id && b.disease_code!==disease_code_id);
      },
      (err)=>console.log(err)
    )
  }
  saveChanges(){
    this.recordService.updateRecord(
      this.email_id_,  
      this.cname_id_, 
      this.disease_code_id_,
    {
      email: this.record.controls["email"].value,
        cname: this.record.controls["cname"].value,
        disease_code: this.record.controls["disease_code"].value,
        total_death: this.record.controls["total_death"].value,
        total_patients: this.record.controls["total_patients"].value
    }).toPromise().then(
      (res)=>{
        this.closeModal1.nativeElement.click();
        console.log("Save", res);
        this.refresh();
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
