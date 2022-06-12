import { Component, OnInit } from '@angular/core';
import { PasswordCardService } from '../../services/password-card/password-card.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PasswordCardFormComponent } from '../password-card-form/password-card-form.component';
import { PasswordCardForm } from '../password-card-form/password-card-form.types';

@Component({
  selector: 'app-password-card-main',
  templateUrl: './password-card-main.component.html',
  styleUrls: ['./password-card-main.component.scss'],
})
export class PasswordCardMainComponent implements OnInit {
  passwordCards: PasswordCardForm[] = []
  private openModal: NgbModalRef

  constructor(
    private readonly passwordCardService: PasswordCardService,
    private readonly modal: NgbModal,
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.reloadPasswordCards()
  }

  openCreatePasswordCardForm() {
    this.openModal = this.modal.open(PasswordCardFormComponent, {size: 'lg'})
    this.openModal.componentInstance.title = 'Create password card'
    this.openModal.componentInstance.data = {
      id: null,
      name: null,
      username: null,
      password: null,
      url: null,
    }

    this.openModal.result.then(async (event) => {
      if (event == null) return
      await this.passwordCardService.save(event)
    }).finally(() => this.reloadPasswordCards())
  }

  openUpdatePasswordCardForm(passwordCardForm: PasswordCardForm) {
    this.openModal = this.modal.open(PasswordCardFormComponent, {size: 'lg'})
    this.openModal.componentInstance.title = 'Update password card'
    this.openModal.componentInstance.data = passwordCardForm

    this.openModal.result.then(async (event: PasswordCardForm) => {
      if (event == null) return
      const {id, ...rest} = event
      await this.passwordCardService.update(id, rest)
    }).finally(() => this.reloadPasswordCards())
  }

  async deletePasswordCardForm(passwordCardForm: PasswordCardForm) {
    await this.passwordCardService
      .delete(passwordCardForm.id)
      .finally(() => this.reloadPasswordCards())
  }

  async reloadPasswordCards(): Promise<void> {
    const passwordCardsResult = await this.passwordCardService.filterByName('')
    this.passwordCards = passwordCardsResult.map(pc => ({
      ...pc,
      obscured: false,
    }))
  }

  async showPassword(passwordCard: PasswordCardForm, index: number) {
    if (passwordCard.obscured) {
      this.passwordCards[index] = {
        ...passwordCard,
        password: '***************',
        obscured: false,
      }
    } else {
      this.passwordCardService.getById(passwordCard.id).then(pc => {
        this.passwordCards[index] = {
          ...pc,
          obscured: true,
        }
      })
    }
  }

  async copyToClipboard(passwordCard: PasswordCardForm) {
    if (passwordCard.obscured) {
      await navigator.clipboard.writeText(passwordCard.password);
    } else {
      this.passwordCardService.getById(passwordCard.id).then(async pc => {
        try {
          await navigator.clipboard.writeText(pc.password);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      })
    }
  }
}
