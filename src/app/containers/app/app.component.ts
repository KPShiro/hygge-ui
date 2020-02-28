import { Component, OnInit } from '@angular/core';
import { SharedFacade } from '@modules/shared/shared.facade';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isProcessing$!: Observable<boolean>;

  public constructor(
    private readonly sharedFacade: SharedFacade,
  ) { }

  public ngOnInit(): void {
    this.isProcessing$ = this.sharedFacade.isProcessing$;
  }
}
