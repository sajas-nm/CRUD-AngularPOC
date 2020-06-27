import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../shared/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { Employees } from '../shared/employees.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.sass'],
  styles: [
    `
      .hero-body {
        height: 100vh;
      }
    `,
  ],
})
export class EmployeesEditComponent implements OnInit {
  id: number;
  data: any;
  form: FormGroup;
  submitted = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public restApi: RestApiService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    // this.data = new Employees();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.getValue(this.id);
    this.form = this.formBuilder.group({
      IDBook: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
    });
  }
  getValue(id) {
    this.restApi.getEmployeeById(id).subscribe((res) => {
      console.log('Single Employee::::', res);
      this.data = res;
    });
  }
  get f() {
    return this.form.controls;
  }
  update() {
    this.submitted = true;
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }
    this.restApi
      .updateEmployee(this.id, this.form.value)
      .subscribe((res) => {
        console.log('res', res);
        this.toastr.success(
          '',
          `Author ${res.FirstName} successfully Updated !`
        );
        this.router.navigate(['list']);
      });
  }
}
