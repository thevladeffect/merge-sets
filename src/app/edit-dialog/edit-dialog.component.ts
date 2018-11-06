import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  public listString: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public list: string[],
  ) {
  }

  ngOnInit() {
    this.listString = this.list.join(', ');
  }

  public getListFromString(): string[] {
    return this.listString
      .replace(/[\s\t ]+/g, '')
      .split(',');
  }

}
