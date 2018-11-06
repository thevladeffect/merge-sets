import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {take, tap} from 'rxjs/operators';

import {sorted, union} from './sorted-set.helper';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-merge-lists',
  templateUrl: './merge-lists.component.html',
  styleUrls: ['./merge-lists.component.scss']
})
export class MergeListsComponent implements OnInit {

  public first: Set = sorted(new Set(['a/1', 'a/2', 'a/7', 'b/23']));
  public second: Set = sorted(new Set(['a/7', 'a/23', 'a/72', 'b/12', 'c/1']));

  public merged: Set;

  constructor(private dialog: MatDialog) {
  }

  public ngOnInit() {
    this.updateMerged();
  }

  public editFirst(): void {
    const dialogRef = this.openEditDialog(Array.from(this.first));
    dialogRef.afterClosed()
      .pipe(
        tap((result: string[]) => {
          if (result) {
            this.first = sorted(new Set(result));
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
            this.second = sorted(new Set(result));
            this.updateMerged();
          }
        }),
        take(1),
      )
      .subscribe();
  }

  private updateMerged(): void {
    this.merged = sorted(union(this.first, this.second));
  }

  private openEditDialog(list: string[]): MatDialogRef<EditDialogComponent> {
    return this.dialog.open(EditDialogComponent, {
      data: list,
    });
  }

}
