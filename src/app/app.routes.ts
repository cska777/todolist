import { TodoComponent } from './todo/todo.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: "", redirectTo:"/home", pathMatch:"full"}, 
    {path:"home", component:HomeComponent},
    {path:"todo", component:TodoComponent},
];
