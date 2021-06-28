import { HttpClient } from '@angular/common/http';
import{Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../model/book.model';
@Injectable({
  providedIn: 'root'
})
export class BookService {


  // ajout du module http client
  constructor(private http:HttpClient) { }

  // récupération des livres
  getAllBooks():Observable<Book[]>{
    // recupération de la variable host dans envirronnements/host/
    let host=environment.host;
    return this.http.get<Book[]>(host+"/books");
 }


   // lien avec Book.component.ts
   select(book:Book):Observable<Book>{
    let host=environment.host;
    book.selected=!book.selected;
    return this.http.put<Book>(host+"/books/"+book._id,book);
  }
  getBook(_id:number):Observable<Book>{
    let host=environment.host;
    return this.http.get<Book>(host+"/books/"+_id);
  }
  updateBook(book:Book):Observable<Book>{
    let host=environment.host;

    return this.http.put<Book>(host+"/books/"+book._id,book);
  }

  searchBooks(keyword:string):Observable<Book[]>{
    let host=environment.host;
    return this.http.get<Book[]>(host+"/books?name_like="+keyword);
  }

  save(book:Book):Observable<Book>{
    let host=environment.host;
    return this.http.post<Book>(host+"/books",book);
  }
}

