import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class Toaster {
  toaster = inject(HotToastService);

  success(message: string): void {
    this.toaster.success(message);
  }

  error(message: string): void {
    this.toaster.error(message);
  }
}
