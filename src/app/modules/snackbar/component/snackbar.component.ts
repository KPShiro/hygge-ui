import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  @Input() message: string = "HARDCODED SNACKBAR MESSAGE";

  constructor() { }

  ngOnInit() {
  }

}
