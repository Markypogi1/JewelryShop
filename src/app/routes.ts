import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
<<<<<<< HEAD
=======
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { ServicepageComponent } from './servicespage/servicespage.component';
import { ShopComponent } from './shop/shop.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { RingpageComponent } from './ringpage/ringpage.component';
import { BraceletsComponent } from './bracelets/bracelets.component';
import { NecklacesComponent } from './necklaces/necklaces.component';
import { EarringsComponent } from './earrings/earrings.component';
import { OrderCompletedComponent } from './ordercompleted/ordercompleted.component';
import { ProductManagementComponent } from './productmanagement/productmanagement.component';



>>>>>>> e167e5b4 (final deployment)

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'homepage', component: HomepageComponent },
<<<<<<< HEAD
  
=======
  { path: 'aboutus', component: AboutpageComponent },
  { path: 'services', component: ServicepageComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contactus', component: ContactpageComponent },
  { path: 'addtocart', component: AddtocartComponent },
  { path: 'rings', component: RingpageComponent },
  { path: 'bracelet', component: BraceletsComponent },
  { path: 'necklace', component: NecklacesComponent },
  { path: 'earring', component: EarringsComponent },
  { path: 'order-completed', component: OrderCompletedComponent },
  { path: 'product-management', component: ProductManagementComponent },





>>>>>>> e167e5b4 (final deployment)
  
];