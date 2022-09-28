import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // 1. lets declare our property isSCreenSmall
  public isScreenSmall!: boolean;

  users!: Observable<User[]>;

  constructor(
    //  2. Now let's place the BreakpointObserver into our  
    // constructor to see how we can evaluate the viewport size.
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
    
    ) { }

  // we can now observe the changes in ngOnInit. 
  ngOnInit(): void {
    // we want to react to the changes when the viewport resizes,
    // so we'll call the observe method.
    this.breakpointObserver
      // read doc -> takes a str or an array of strings which is One or more media queries to check.
      .observe([Breakpoints.XSmall])
      // And we can subscribe to the results of this. it automatically imports BreakpointState
      .subscribe((state: BreakpointState) => {
        // and on the state, we can go ahead and check if the breakpoint matches. 
        this.isScreenSmall = state.matches;
    });

    this.users = this.userService.users;
    this.userService.loadUsers();

    this.users.subscribe(data => {
      console.log(data);
    })
  }
}
