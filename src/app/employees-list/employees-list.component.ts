import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.sass'],
  styles: [
    `
      .button.is-loading {
        color: transparent !important;
        pointer-events: none;
        background: transparent;
        border: none;
        font-size: 3rem;
      }
      .button.is-loading::after {
        border: 2px solid #00d1b2;
        animation: spinAround 0.5s infinite linear;
        border-radius: 290486px;
        border-right-color: transparent;
        border-top-color: transparent;
        content: '';
        display: block;
        height: 1em;
        position: relative;
        width: 1em;
      }
      .hero-body {
        height: 100vh;
      }
     
      body::-webkit-scrollbar {
        width: 1em;
      }

      body::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }

      body::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
      }
    `,
  ],
})
export class EmployeesListComponent implements OnInit {
  Employees: any = [];
  isLoad: boolean = false;

  constructor(public restApi: RestApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }
  loadEmployees() {
    this.isLoad = true;
    return this.restApi.getAllEmployees().subscribe((res) => {
      // let data = res.data;
      console.log('rendered', res);
      this.isLoad = false;
      return (this.Employees = res);
    });
  }

  delete(emp) {
    console.log(emp);
    //Delete item in Student data
    if (confirm(`Are you sure You Want to delete ? ${emp.FirstName}`)) {
      this.restApi.deleteEmployee(emp.ID).subscribe((res) => {
        //Update list after delete is successful
        console.log('res', res);
        this.toastr.error('', `Author Deleted!`);

        this.loadEmployees();
      });
    }
  }
}
