import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscoverService } from 'src/app/services/discover.service';
import { DiseaseTypeService } from '../../services/disease-type.service';
import { DiseaseService } from '../../services/disease.service';
import { IDisease } from '../disease/IDisease';
import { IDiseaseType } from './IDeseaseType';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {
  @ViewChild('closeModal1') 
  closeModal1!: ElementRef;
  @ViewChild('closeModal2')
  closeModal2!: ElementRef;
  

  @ViewChild('closeModal3') 
  closeModal3!: ElementRef;
  @ViewChild('closeModal4')
  closeModal4!: ElementRef;

  diseases: FormGroup;

  diseaseArr: IDisease[] = [];
  diseaseTypes: IDiseaseType[] = [];
  discover:any[]=[];
  disease_code_id:string;
  disease_type_code_id: number;

  diseaseTypesForm: FormGroup;

  constructor(private diseaseService:DiseaseService, 
              private formBuilder: FormBuilder, 
              private diseaseTypeService:DiseaseTypeService,
              private discoverService: DiscoverService){ }

  ngOnInit(): void {
    this.diseases = this.formBuilder.group({
      disease_code: ['',Validators.required],
      pathogen: ['',Validators.required],
      description: ['',Validators.required],
      id: [0, Validators.required],
    })
    this.diseaseTypesForm = this.formBuilder.group({
      id: [0, Validators.required],
      description: ['',Validators.required],
    })
    this.refresh2();
    this.refresh();
    this.discoverService.getDiscoveries().toPromise().then(
      (res:any)=>this.discover=res,
      (err)=>console.log(err)
    )
  }
  refresh2() {
    this.diseaseTypeService
      .getDiseaseType().toPromise().then(
        (data: any) =>
          this.diseaseTypes = data,
        (err) => {
          console.error(err);
        }
      );
  }
  refresh() {
    this.diseaseService
      .getDiseases().toPromise().then(
        (data: any) =>
          this.diseaseArr = data,
        (err) => {
          console.error(err);
        }
      );
  }

  edit(id: any) {
    this.diseaseService.getDiseaseById(id).subscribe(
      (res) => {
        console.log("Res", res);
        this.diseases.patchValue({
          disease_code: res.disease_code,
          pathogen: res.pathogen,
          description: res.description,
          id: res.id
        });
        this.disease_code_id = res.disease_code;
      },
      (err) => console.log(err)
    )
  }
  create() {
      this.diseaseService.createDisease({
        disease_code: this.diseases.controls["disease_code"].value,
        pathogen: this.diseases.controls["pathogen"].value,
        description: this.diseases.controls["description"].value,
        id: this.diseases.controls["id"].value
      }).toPromise().then(
        () => {
          this.closeModal2.nativeElement.click();
          this.refresh();
        },
        (err) => console.log(err)
      )
    }
  delete(val: any) {
    this.diseaseService.deleteDisease(val).toPromise().then(
      (res) => {
        //this.diseaseTypes = this.diseaseTypes.filter((b) => b.disease_code !== val);
        this.refresh();
      },
      (err) => console.log(err)
    )
  }
  saveChanges() {
      this.diseaseService.updateDisease({
        disease_code: this.diseases.controls["disease_code"].value,
        pathogen: this.diseases.controls["pathogen"].value,
        description: this.diseases.controls["description"].value,
        id: this.diseases.controls["id"].value
      }, this.disease_code_id,).toPromise().then(
        (res) => {
          console.log("Disease",res)
          console.log("Disease Form",this.diseases);
          this.closeModal1.nativeElement.click();
          this.refresh();
        },
        (err) => {
          console.log(err);
        }
      )
  }


/// Disease Type

editDiseaseType(id: any) {
  this.diseaseTypeService.getDiseaseTypeById(id).subscribe(
    (res) => {
      this.diseaseTypesForm.patchValue({
        description: res.description,
        id: res.id
      });
      this.disease_type_code_id = res.id;
    },
    (err) => console.log(err)
  )
}
createDiseaseType() {
    this.diseaseTypeService.createDiseaseType({
      id: this.diseaseTypesForm.controls["id"].value,
      description: this.diseaseTypesForm.controls["description"].value,
    }).toPromise().then(
      () => {
        this.closeModal3.nativeElement.click();
        this.refresh2();
      },
      (err) => console.log(err)
    )
  }
  deleteDiseaseType(val: any) {
  this.diseaseTypeService.deleteDiseaseType(val).toPromise().then(
    (res) => {
      this.diseaseTypes = this.diseaseTypes.filter((b) => b.id !== val);
      this.refresh2();
    },
    (err) => console.log(err)
  )
}
saveChangesDiseaseType() {
    this.diseaseTypeService.updateDiseaseType({
      id: this.diseaseTypesForm.controls["id"].value,
      description: this.diseaseTypesForm.controls["description"].value,
    }, this.disease_type_code_id,).toPromise().then(
      (res) => {
        this.closeModal4.nativeElement.click();
        this.refresh2();
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
