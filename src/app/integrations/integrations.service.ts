import {Injectable, NgZone} from '@angular/core';
import {AwsSsoService} from './providers/aws-sso.service';
import {ConfigurationService} from '../services-system/configuration.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IntegrationsService {
  private sessionSubscription: Subscription;
  private syncSubscription: Subscription;

  constructor(private awsSsoService: AwsSsoService,
              private configurationService: ConfigurationService,
              private router: Router,
              private ngZone: NgZone) {}

  login(portalUrl, region) {
   if (this.sessionSubscription !== undefined) { this.sessionSubscription.unsubscribe(); }
   this.sessionSubscription = this.awsSsoService.generateSessionsFromToken(this.awsSsoService.firstTimeLoginToAwsSSO(region, portalUrl))
     .subscribe((AwsSsoSessions) => {
     // Save sessions to workspace
     this.awsSsoService.addSessionsToWorkspace(AwsSsoSessions);
     this.ngZone.run(() =>  this.router.navigate(['/sessions', 'session-selected']));
   });
  }


  logout() {
    this.awsSsoService.logOutAwsSso();
  }

  syncAccounts() {
    if (this.syncSubscription !== undefined) { this.syncSubscription.unsubscribe(); }
    this.syncSubscription = this.awsSsoService.generateSessionsFromToken(this.awsSsoService.getAwsSsoPortalCredentials()).subscribe((AwsSsoSessions) => {
      this.awsSsoService.addSessionsToWorkspace(AwsSsoSessions);
      this.ngZone.run(() =>  this.router.navigate(['/sessions', 'session-selected']));
    });
  }
}
