import {Component, OnInit} from '@angular/core';
import {OfferService} from '../../services/offer.service';
import {Offer} from '../../classes/offer';
import {Page} from '../../classes/Page';
import {OfferPageButton} from '../../classes/OfferPageButton';
import {MatDialog} from '@angular/material';
import {DeleteOfferDialogComponent} from './delete-offer-dialog/delete-offer-dialog.component';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'bookTitle', 'expires', 'edit', 'delete', 'details'];
  myOffers: Array<Offer>;
  page = 0;
  pageSize = 5;
  totalElements = 0;
  pages = new Array<OfferPageButton>();
  pageHighlightStatus = new Array<boolean>();
  totalPagesCount: number;
  pageNavigationEnabled = true;
  cannotDelete = false;
  pageSizeOptions: number[] = [2, 5, 10, 20];

  constructor(private offerService: OfferService, public dialog: MatDialog) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getOffersPaged(this.page, this.pageSize);
    this.pageHighlightStatus[this.page] = true;
  }

  getOffers() {
     this.offerService.getShortForMe().toPromise().then( (data) => {
       this.myOffers = data;
      },
     (error) => {
      console.log(error);
     }
     );
  }

  getOffersPaged(page, size) {
    this.offerService.getShortForMePaged(page, size)
      .toPromise().then((data) => {
        this.myOffers = data.content;
        this.page = data.number;
        this.totalElements = data.totalElements;
        this.totalPages(data);
        console.log(data);
      });
    this.pageSize = size;
  }

  totalPages(data: Page) {
    this.pageNavigationEnabled = true;
    this.pages = [];
    let after = 0;
    if (this.page > 0) {
      if (data.totalPages - this.page > 1) {
        after = this.page + 1;
      }
      if ( after === 0 ) {
        if ( this.page >= 2 ) {
          this.pages.push(new OfferPageButton( this.page - 2 ));
        }
      }
      if (this.page >= 1) {
        this.pages.push(new OfferPageButton( this.page - 1 ));
      }
      this.pages.push(new OfferPageButton( this.page ));
      if (after !== 0) {
        this.pages.push(new OfferPageButton( after ));
      }
    } else {
      this.pages.push(new OfferPageButton(0));
      if (data.totalPages > 2) {
        after = 2;
      } else if (data.totalPages === 2) {
        after = 1;
      } else {
        this.pageNavigationEnabled = false;
      }
      for (let i = 0; i < after ; i++) {
        this.pages.push(new OfferPageButton(i + 1));
      }
    }
    this.totalPagesCount = data.totalPages;
  }

  selectPage(i: number) {
    this.pageHighlightStatus = [];
    this.pageHighlightStatus[i] = true;
    this.getOffersPaged(i, this.pageSize);
  }

  previous() {
    if (this.page > 0) {
      this.selectPage(this.page - 1);
    }
  }

  next() {
    if (this.page < this.totalPagesCount - 1) {
      this.selectPage(this.page + 1);
    }
  }

  changePageSize(number: number, value: any) {
    this.pageSize = value;
    this.selectPage(number);
  }

  onDelete(id: number, name: string) {
    const dialogRef = this.dialog.open(DeleteOfferDialogComponent, {
      width: '250px',
      data: {offerName: name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.offerService.delete(id).subscribe(
          () => {
            this.refresh();
          },
          () => {
            this.cannotDelete = true;
            setTimeout(() => {
              this.cannotDelete = false;
            }, 5000);
          }
        );
      }
    });
  }
}
