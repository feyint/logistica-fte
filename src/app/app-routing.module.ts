import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { DeliveryFormComponent } from './components/delivery-form/delivery-form.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: AccesoComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'client/new', component: ClientFormComponent },
  { path: 'deliveries', component: DeliveryListComponent },
  { path: 'delivery/form', component: DeliveryFormComponent },
  { path: 'delivery/form/:id', component: DeliveryFormComponent } // Para la edición
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
