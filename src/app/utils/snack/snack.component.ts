import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackService } from '../../services/snack/snack.service';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss'],
})
export class SnackComponent implements OnInit, OnDestroy {
  styleClass: string;
  private snackSub: Subscription;
  tooltip: string;

  constructor(private snackService: SnackService) {}

  ngOnInit(): void {
    this.snackSub = this.snackService.getSnackSub().subscribe(
      (result) => {
        this.tooltip = result;
        this.styleClass = 'a-snack-show';
        setTimeout(() => {
          if (result != null) {
            this.styleClass = 'a-snack';
          }
        }, 3000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.snackSub.unsubscribe();
  }
}
