import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookComponent } from './components/book/book.component';
import { HomeComponent } from './components/home/home.component';
import {BooksEditComponent} from './components/books-edit/books-edit.component';
import { BooksNewComponent } from './components/books-new/books-new.component';
const routes: Routes = [
  {path:"books", component:BookComponent},
  { path: "editBook/:_id", component:BooksEditComponent},
  {path: "newBook",component:BooksNewComponent},
  { path: "", component:HomeComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
