import { CATCH_ERROR_VAR, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/model/book.model';
import { BookService} from '../../service/book.service';
import {catchError, map, startWith} from 'rxjs/operators';
import { AppDataState, DataStateEnum } from 'src/app/state/book.state';
import { of } from 'rxjs';
import {Router} from '@angular/router';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  // variable book est un table de livre
books$:Observable<AppDataState<Book[]>> | null=null;
readonly DataStateEnum=DataStateEnum;
// injection du servcie bookService
  constructor(private bookService:BookService, private router:Router) { }

  ngOnInit(): void {
  }

  // fonction d'appel service/click boutton component.html
  onGetAllBooks(){
   this.books$=this.bookService.getAllBooks().pipe(
     map(data=>({dataState:DataStateEnum.LOADED, data:data})),
     startWith({dataState:DataStateEnum.LOADING}))

    }
    onSelect(p: Book) {

        // lien avec le fichier service
    this.bookService.select(p)
          .subscribe(data=>{
            p.selected=data.selected;
          })
      }
      onNewBook() {
        this.router.navigateByUrl("newBook");
      }
    
      onEdit(p: Book) {
        this.router.navigateByUrl("editBook/"+p._id);
      }
      onSearch(dataForm: any) {
        this.books$= this.bookService.searchBooks(dataForm.keyword).pipe(
          map(data=>{
            console.log(data);
            return ({dataState:DataStateEnum.LOADED,data:data})
          }),
          startWith({dataState:DataStateEnum.LOADING}),
          catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
        );
      }
}

