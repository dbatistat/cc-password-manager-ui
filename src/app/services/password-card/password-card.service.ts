import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreatePasswordCard, PasswordCard, UpdatePasswordCard } from './password-card.types';

@Injectable({
  providedIn: 'root',
})
export class PasswordCardService {
  constructor(private httpClient: HttpClientService) {
  }

  filterByName(name: string): Promise<PasswordCard[]> {
    return this.httpClient.get(`/password-card`, {params: {name}})
  }

  getById(id: string): Promise<PasswordCard> {
    return this.httpClient.get(`/password-card/${id}`)
  }

  save(createPasswordCard: CreatePasswordCard): Promise<PasswordCard> {
    return this.httpClient.post('/password-card', createPasswordCard)
  }

  update(id: string, updateAccount: UpdatePasswordCard): Promise<PasswordCard> {
    return this.httpClient.put(`/password-card/${id}`, updateAccount)
  }

  delete(id: string): Promise<void> {
    return this.httpClient.delete(`/password-card/${id}`)
  }
}
