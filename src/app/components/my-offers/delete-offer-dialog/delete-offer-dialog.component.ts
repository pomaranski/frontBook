import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-offer-dialog',
  templateUrl: './delete-offer-dialog.component.html',
  styleUrls: ['./delete-offer-dialog.component.css']
})
export class DeleteOfferDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OfferName) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

class OfferName {
  offerName: string;
}

