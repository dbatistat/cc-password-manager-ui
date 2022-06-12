export type PasswordCard = {
  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly password: string;
  readonly url: string;
};

export type CreatePasswordCard = {
  readonly name: string;
  readonly username: string;
  readonly password: string;
  readonly url: string;
};

export type UpdatePasswordCard = Partial<CreatePasswordCard>;
