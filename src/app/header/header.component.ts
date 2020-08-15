import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage-service';
import { AuthenticationService } from '../authentication/authentication-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStoreService: DataStorageService,
              private authService: AuthenticationService) { }

  isAuthenticated = false;
  authSubs: Subscription;

  ngOnInit() {
    this.authSubs = this.authService.userSub.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }
  onSaveData(){
    this.dataStoreService.storeRecipe();
  }

  onFetchData() {
    this.dataStoreService.fetchRecipeData().subscribe();
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
