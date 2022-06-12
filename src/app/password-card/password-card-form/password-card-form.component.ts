import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PasswordCardForm } from './password-card-form.types';

@Component({
  selector: 'app-password-card-form',
  templateUrl: './password-card-form.component.html',
  styleUrls: ['./password-card-form.component.scss'],
})
export class PasswordCardFormComponent implements OnInit {
  @Input() reload: () => void
  @Input() data: PasswordCardForm
  @Input() title: string

  constructor(
    public readonly activeModal: NgbActiveModal,
    private readonly spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
  }

  save(): void {
    this.activeModal.close(this.data)
  }
}
