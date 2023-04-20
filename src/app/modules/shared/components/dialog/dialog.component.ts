import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Subject, first, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: ``,
  styles: []
})
export class DialogComponent {

  private destroy$ = new Subject<boolean>();

  constructor(private dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.pipe(first()).subscribe(data => this.openDialog(data));
  }

  openDialog(data: Data): void {
    const dialogRef = this.dialog.open(data['component'], { autoFocus: false, panelClass: ['medium', 'p-0'], data: { activatedRoute: this.activatedRoute.parent } });
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.router.navigate([data['redirectTo'] ? data['redirectTo'] : '..'], { relativeTo: this.activatedRoute });
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}

// Usage Way...
// {
//     path: 'path-name',
//     data: { component: {YourComponent} },
//     component: DialogComponent
//   }
