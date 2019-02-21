import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-my-offer-dialog',
  templateUrl: './delete-my-offer-dialog.component.html',
  styleUrls: ['./delete-my-offer-dialog.component.css']
})
export class DeleteMyOfferDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeleteMyOfferDialogComponent>,
              ) { }

  onNoClick() {
    this.dialogRef.close();
  }
}
