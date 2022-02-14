import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditPostComponent>,
  @Inject(MAT_DIALOG_DATA) data,) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }
}
