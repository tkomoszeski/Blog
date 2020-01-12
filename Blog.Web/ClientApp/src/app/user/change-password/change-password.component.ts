import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordValidatorService } from '../services/password-validator';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    constructor(private formBuilder: FormBuilder,
        private userSerivce: UserService,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService,
        private router: Router,
        private passwordValidatorSerivce: PasswordValidatorService) { }

    public passwordForm: FormGroup;

    public ngOnInit(): void {
        const passwordControl = this.passwordValidatorSerivce.createPasswordControl();
        const repeatedNewPasswordControl = this.passwordValidatorSerivce.createRepeatedPasswordControl(passwordControl);
        this.passwordForm = this.formBuilder.group({
            password: ['', Validators.required],
            newPassword: passwordControl,
            repeatedNewPassword: repeatedNewPasswordControl
        });
    }

    public onSubmit(): void {
        if (this.passwordForm.invalid) {
            return;
        }

        this.userSerivce.changePassword(this.passwordForm.value).subscribe(
            data => {
                this.alertService.success('Change password successful, you can login now with your new password', true);
                const userId = Number(this.activatedRoute.snapshot.paramMap.get('userId'));
                this.router.navigate(['profile', userId]);
            },
            errorData => {
                this.alertService.error(errorData.error.message);
            });
    }

}