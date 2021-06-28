import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../service/book.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-books-new',
  templateUrl: './books-new.component.html',
  styleUrls: ['./books-new.component.css']
})
export class BooksNewComponent implements OnInit {

  bookFormGroup?:FormGroup;
  submitted:boolean=false;

  constructor(private fb:FormBuilder, private bookService:BookService) { }

  ngOnInit(): void {
    this.bookFormGroup=this.fb.group({
      author:["",Validators.required],
      title:["",Validators.required],
      publishingDate:[new Date(),Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required],
    });
  }

  onSaveBook() {
    this.submitted=true;
    if(this.bookFormGroup?.invalid) return;
    this.bookService.save(this.bookFormGroup?.value)
      .subscribe(data=>{
        alert("Success Saving product");
      });
  }
}
