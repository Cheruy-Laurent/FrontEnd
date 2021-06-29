import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../service/book.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Book } from 'src/app/model/book.model';
@Component({
  selector: 'app-books-edit',
  templateUrl: './books-edit.component.html',
  styleUrls: ['./books-edit.component.css']
})
export class BooksEditComponent implements OnInit {
  bookId:number;
  bookFormGroup?:FormGroup;
  submitted:boolean=true;
  constructor(private activatedRoute:ActivatedRoute,
              private bookService:BookService,
              private fb:FormBuilder) {
    this.bookId=activatedRoute.snapshot.params._id;
  }

  
  ngOnInit(): void {
    this.bookService.getBook(this.bookId)
      .subscribe(book=>{
        this.bookFormGroup=this.fb.group({
          _id:[book._id,Validators.required],
          author:[book.author,Validators.required],
          title:[book.title,Validators.required],
          price:[book.price,Validators.required],
          publishingDate:[book.publishingDate,Validators.required],
          quantity:[book.quantity,Validators.required],
          selected:[book.selected,Validators.required],
          available:[book.available,Validators.required]
        })
      });
  }

  onUpdateBook() {
    this.bookService.updateBook(this.bookFormGroup?.value)
      .subscribe(data=>{
        alert("Success Product updated");
      });
  }
}