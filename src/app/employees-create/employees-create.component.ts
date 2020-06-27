import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-employees-create',
  templateUrl: './employees-create.component.html',
  styleUrls: ['./employees-create.component.sass'],
  styles: [
    `
      .hero-body {
        height: 100vh;
      }
    `,
  ],
})
export class EmployeesCreateComponent implements OnInit {
  // data: Employees;
  form: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    public restApi: RestApiService,
    public router: Router,
    private toastr: ToastrService
  ) {
    // this.data = new Employees();
    // console.log(this.data);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      IDBook: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }

    this.restApi.createEmployee(this.form.value).subscribe((res) => {
      console.log('Sucess ', res);
      this.toastr.success('', `Author ${res.FirstName} successfully created !`);

      this.router.navigate(['list']);
    });
  }
}
