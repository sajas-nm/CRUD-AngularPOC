import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesCreateComponent } from './employees-create/employees-create.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesEditComponent } from './employees-edit/employees-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'create', component: EmployeesCreateComponent },
  { path: 'list', component: EmployeesListComponent },
  { path: 'edit/:id', component: EmployeesEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
