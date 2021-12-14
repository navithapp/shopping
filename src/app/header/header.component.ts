import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorage } from "../shared/data-storage.service";

@Component( {
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.css']
} )
export class HeaderComponent implements OnInit, OnDestroy {

    authSub = new Subscription;
    isAuthenticated = false;

    constructor(private dataStorage: DataStorage, private authService: AuthService) {}

    ngOnInit() {
       this.authSub = this.authService.userSub.subscribe(user => {
           this.isAuthenticated = !!user;
       });
    }

    onSavedata() {
        this.dataStorage.storeRecipes();
    }

    onFetchdata() {
        this.dataStorage.fetchData().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authSub.unsubscribe();
    }
}