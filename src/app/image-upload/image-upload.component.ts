import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  public images: any[];

  constructor() { 
    this.images = [];
  }

  ngOnInit(): void {
  }

  public addImage(image: string) {
    this.images.push(image);
  }

  public deleteImage() {
    this.images.pop();
  }
}
