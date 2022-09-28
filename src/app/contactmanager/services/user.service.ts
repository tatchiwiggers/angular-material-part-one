import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // 11.So let's go ahead and declare our BehaviorSubject that components will be able to subscribe to
  // We're going to call as Observable on this subject, which will be exposed to our components
  private _users: BehaviorSubject<User[]>;

  // 1. begin with the private dataStore that will contain our users in memory for us
  // 2. we don't want to expose this internal store(private), and this automatically imports the user from models.
  private dataStore: {
    users: User[];
  };

  // 3. Bc we're going to do an HTTP call to get our users, 
  // we need to add an HttpClient into our constructor 
  constructor(private http: HttpClient) { 
    // 4. now we need to initialize our dataStore and import HttpClientModule into our contactmanager.module.
    this.dataStore = { users: [] };
    // 12.So now that we have our BehaviorSubject, let's go ahead and instantiate that,
    // along with our internal dataStore in the constructor,
    this._users = new BehaviorSubject<User[]>([]);
  }

  // 13.let's also expose a get property that will allow our components to subscribe to this BehaviorSubject.
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  userById(id: number) {
    return this.dataStore.users.find(x => x.id == id);
  }
  // 5.  create a public loadAll method that our initializing component
  // should be able to call to load up the initial user data
  loadUsers() {
    // 6. Let's also define the URL to the endpoint that the author of this app has hosted at azurewebsites,
    const userUrl = 'http://angular-material-api.azurewebsites.net/users';
    // 7. let's get a User array from this URL
    return this.http.get<User[]>(userUrl)
    // 8. and subscribe to a response
    .subscribe(data => {
      // 9. when we receive our data, let's go ahead and add it to our store.
      this.dataStore.users = data;
      // 14. And now that components are able to subscribe to our BehaviorSubject,
      //let's also go ahead and actually call next on our BehaviorSubject to publish
      // data to all our subscribing components. So whenever we receive data back from our loadAll method.

      //15. We want to go ahead and call next on our BehaviorSubject to let our
      // listening components know that data is available
      // now  I want to create a new object and then copy all the properties from our dataStore
      // onto this new object and then just publish our users.
      // 16. And we can achieve that by using Object.assign, and this will take two params:
      // - The first one is the target that we want to copy to, and that's going to be a new Object,
      // - and then we want the source that we want to copy from, and that's going to be our dataStore,
      this._users.next(Object.assign({}, this.dataStore).users);
    })
  }
}
// 10.now we are able to fetch the data, but remember, we don't want to expose our internal store
//  17. lets try it out!!