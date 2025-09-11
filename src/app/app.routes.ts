import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/homePage/homePage.component';
import { LayoutComponent } from './shared/layout/layout/layout.component';
import { isAuthenticatedGuard } from './auth/guards/isAuthenticated.guard';
import { isAdminGuard } from './auth/guards/isAdmin.guard';
import { isVoterGuard } from './auth/guards/isVoter.guard';
import { isCandidateGuard } from './auth/guards/isCandidate.guard';
import { isAdminOrCandidateGuard } from './auth/guards/isAdminOrCandidate.guard';
import { isAdminOrVoterGuard } from './auth/guards/isAdminOrVoter.guard';

export const routes: Routes = [
    {
        path: "auth",
        loadComponent: () => import("./auth/layout/authLayout/authLayout.component"),
        children: [
            {
                path: "login",
                loadComponent: () => import("./auth/pages/login/login.component")
            },
            {
                path: "register",
                loadComponent: () => import("./auth/pages/register/register.component")
            },
            {
                path: "**",
                redirectTo: "login"
            },
        ]
    },
    {
        path: "access-denied",
        loadComponent: () => import("./shared/pages/accessDenied/accessDenied.component")
    },
    {
        path: "",
        component: LayoutComponent,
        canMatch: [isAuthenticatedGuard],
        children: [
            {
                path: 'home',
                component: HomePageComponent
            },
            {
                path: "candidates",
                loadComponent: () => import("./candidates/pages/allCandidates/allCandidates.component")
            },
            {
                path: "voters",
                loadComponent: () => import("./voters/pages/allVoters/allVoters.component"),
                canMatch: [isAdminGuard]
            },
            {
                path: "results",
                loadComponent: () => import("./votes/pages/results/results.component")
            },
            {
                path: "make-your-vote",
                loadComponent: () => import("./votes/pages/createVote/createVote.component"),
                canMatch: [isVoterGuard]
            },
            {
                path: "voter-account",
                loadComponent: () => import("./voters/pages/voterAccount/voterAccount.component"),
                canMatch: [isVoterGuard]
            },
            {
                path: "candidate-account",
                loadComponent: () => import("./candidates/pages/candidateAccount/candidateAccount.component"),
                canMatch: [isCandidateGuard]
            },
            {
                path: "**",
                redirectTo: "home"
            }
        ]
    },
    {
        path: "**",
        redirectTo: ""
    }

];
