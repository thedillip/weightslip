import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { WeightslipComponent } from './components/weightslip/weightslip.component';
import { AuthGuard } from './service/auth.guard';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';

const routes: Routes = [
  {
    path: '',
    component: WeightslipComponent,
    pathMatch: 'full',
  },
  {
    path: 'bank-details',
    component: BankDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'ask',
    component: AskQuestionComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'weightslip',
    component: WeightslipComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
