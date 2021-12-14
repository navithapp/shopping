import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRouting } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShoppinglistModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppinglistModule } from './shopping-list/shopping-list.module';
// import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    // DropdownDirective,
    // LoadingSpinnerComponent,
    // AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    ReactiveFormsModule,
    HttpClientModule,
    ShoppinglistModule,
    AuthModule,
    SharedModule,
    CoreModule  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
