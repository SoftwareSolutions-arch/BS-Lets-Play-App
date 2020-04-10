import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: ' browse/login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  }, 
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'listparticipants',
    loadChildren: () => import('./listparticipants/listparticipants.module').then( m => m.ListparticipantsPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'sidebar',
    loadChildren: () => import('./sidebar/sidebar.module').then( m => m.SidebarPageModule)
  },
  {
    path: 'activity-detail',
    loadChildren: () => import('./activity-detail/activity-detail.module').then( m => m.ActivityDetailPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'activity-join',
    loadChildren: () => import('./activity-join/activity-join.module').then( m => m.ActivityJoinPageModule)
  },
  {
    path: 'browse',
    loadChildren: () => import('./browse/browse.module').then( m => m.BrowsePageModule)
  },

  {
    path: 'listview',
    loadChildren: () => import('./listview/listview.module').then( m => m.ListviewPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-paassword/change-paassword.module').then( m => m.ChangePaasswordPageModule)
  },
  {
    path: 'forgot-password-otp',
    loadChildren: () => import('./forgot-password-otp/forgot-password-otp.module').then( m => m.ForgotPasswordOtpPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-and-condition',
    loadChildren: () => import('./terms-and-condition/terms-and-condition.module').then( m => m.TermsAndConditionPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
