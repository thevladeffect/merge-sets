import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {take, tap} from 'rxjs/operators';

import {Merger, sorted} from './sorted-set.helper';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-merge-lists',
  templateUrl: './merge-lists.component.html',
  styleUrls: ['./merge-lists.component.scss']
})
export class MergeListsComponent implements OnInit {

  public first: string[] = ['a/1', 'a/2', 'a/7', 'b/23'];
  public second: string[] = ['a/7', 'a/23', 'a/72', 'b/12', 'c/1'];

  public merged: string[];

  constructor(private dialog: MatDialog) {
  }

  public ngOnInit() {
    this.updateMerged();
  }

  public editFirst(): void {
    const dialogRef = this.openEditDialog(this.first);
    dialogRef.afterClosed()
      .pipe(
        tap((result: string[]) => {
          if (result) {
            this.first = sorted(result);
            this.updateMerged();
          }
        }),
        take(1),
      )
      .subscribe();
  }

  public editSecond(): void {
    const dialogRef = this.openEditDialog(Array.from(this.second));
    dialogRef.afterClosed()
      .pipe(
        tap((result: string[]) => {
          if (result) {
            this.second = sorted(result);
            this.updateMerged();
          }
        }),
        take(1),
      )
      .subscribe();
  }

  private updateMerged(): void {
    const merger = new Merger(this.first, this.second);
    this.merged = merger.getResult();
  }

  private openEditDialog(list: string[]): MatDialogRef<EditDialogComponent> {
    return this.dialog.open(EditDialogComponent, {
      data: list,
    });
  }

}
