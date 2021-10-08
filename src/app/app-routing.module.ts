import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkaletonComponent } from './layout/skaleton/skaleton.component';

const routes: Routes = [

  {
    path:'',redirectTo:'/auth/login',pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:()=>
    import('@modules/auth/auth.module').then((m)=>m.AuthModule)
  },

  {path:'panel',component:SkaletonComponent,
  children: [
    {
      path: 'user',
      loadChildren: () =>
        import('@modules/user/user.module').then( (m) => m.UserModule)
    },{
      path: 'create',
      loadChildren:()=>
      import('@modules/user/user.module').then( (m) => m.UserModule)
    }
  ]
},{
  path:'**',redirectTo:'/panel/user',pathMatch:'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
