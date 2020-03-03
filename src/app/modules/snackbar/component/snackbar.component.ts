import { Component, OnInit, Input, Inject } from '@angular/core';
import { SNACKBAR_CONFIG, SnackbarConfig } from '../snackbar.config';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  @Input() public message!: string;

  constructor(
    @Inject(SNACKBAR_CONFIG) public readonly config: SnackbarConfig,
  ) { }

  ngOnInit() {
    console.log(this.config);
  }

}
