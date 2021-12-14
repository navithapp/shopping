import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth/auth.component";
import { RecipesRoutingModule } from "./recipes/recipes-routing.module";
import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { WelcomeComponent } from "./welcome/welcome.component";


const route: Routes = [
    { path: '', 
      component: WelcomeComponent
    },
    { path: 'auth', 
      component: AuthComponent
    },
    { path:'shopping', component: ShoppingListComponent },
    {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
    
    { path:'**',
      redirectTo: '/recipes'
    }
  ]

@NgModule( {
    imports: [ 
         RouterModule.forRoot(route)
    ],
    exports: [
        RouterModule
    ]
} )

export class AppRouting {

}