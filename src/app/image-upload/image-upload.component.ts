import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  public images: any[];
  productForm: FormGroup;
  items: FormArray;
  public imageSet: any = {};

  // get itemsArray() {
  //   return this.productForm.controls.items as FormArray;
  // }

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.images = [];
    this.productForm = this.formBuilder.group({
      items: new FormArray([], []),
  });
  }

  ngOnInit() {
    this.productForm.valueChanges.subscribe((data) => {
      console.log(data)
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: ''
    });
  }

  addItem(): void {
    this.items = this.productForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  
  public addImage(event: any) {
    // console.log(event);
    let files: FileList = event.target.files;
    let file : File = files[0];
    this.images.push(file)
    console.log(event.target.name);
    this.addItem();
  }

  // public addImage(image: string) {
  //   this.images.push(image);
  // }

  // updateObject(value, index) {
  //   let objToSend = [
  //     {
  //       [this.imageSet[index]]: {"name": 'PRatik', "desc": 'description'},
  //     },
  //   ];

      updateObject(formData: any) {
        console.log(formData);
      }

    // console.log(objToSend)
  // }


  public deleteImage() {
    this.images.pop();
  }
}
