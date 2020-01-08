import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'workflow', pathMatch: 'full'},
  {path: 'coin', loadChildren: () => import('./main/views/coin/coin.module').then(m => m.CoinModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // {enableTracing: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
