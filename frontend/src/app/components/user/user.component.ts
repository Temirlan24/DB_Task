import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';
import { ICountry } from '../country/ICountry';
import { IUser } from './IUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('closeModal1')
  closeModal1!: ElementRef;
  @ViewChild('closeModal2')
  closeModal2!: ElementRef;
  user!: FormGroup;
  users: IUser[] = [];
  country: ICountry[] = [];
  constructor(private service: UserService, 
      private formBuilder: FormBuilder, 
      private countryService: CountryService) { }

  ngOnInit(): void {
    this.refresh();
    this.user = this.formBuilder.group({
      email: ['',Validators.required],
      name: ['',Validators.required],
      surname: ['',Validators.required],
      salary: [0, Validators.required],
      phone: ['',Validators.required],
      cname: ['',Validators.required]
    })
  }
  refresh() {
    this.service
      .getUsers().toPromise().then(
        (data: any) =>
          this.users = data,
        (err) => {
          console.error(err);
        }
      );
    this.countryService.getCountries().toPromise().then(
      (res: any) => {
        this.country = res;
      },
      (err) => console.log(err)
    )
  }
  edit(id: any) {
    this.service.getUser(id).subscribe(
      (res) => {
        this.user.patchValue({
          email: res.email,
          name: res.name,
          surname: res.surname,
          salary: res.salary,
          phone: res.phone,
          cname: res.cname,
        });
      },
      (err) => console.log(err)
    )
  }
  create() {
      this.service.createUser({
        email: this.user.controls["email"].value,
        name: this.user.controls["name"].value,
        surname: this.user.controls["surname"].value,
        salary: this.user.controls["salary"].value,
        phone: this.user.controls["phone"].value,
        cname: this.user.controls["cname"].value,
      }).toPromise().then(
        () => {
          this.closeModal2.nativeElement.click();
          this.refresh();
        },
        (err) => console.log(err)
      )
  }
  delete(val: any) {
    this.service.deleteUser(val).toPromise().then(
      (res) => {
        this.users = this.users.filter((b) => b.email !== val);
      },
      (err) => console.log(err)
    )
  }
  saveChanges() {
      this.service.updateUser({
        email: this.user.controls["email"].value,
        name: this.user.controls["name"].value,
        surname: this.user.controls["surname"].value,
        salary: this.user.controls["salary"].value,
        phone: this.user.controls["phone"].value,
        cname: this.user.controls["cname"].value,
      }, this.user.controls["email"].value).toPromise().then(
        () => {
          this.closeModal1.nativeElement.click();
          this.refresh();
        },
        (err) => {
          console.log(err);
        }
      )
  }
}