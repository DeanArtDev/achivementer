export type Card = {
  id: string;
  termUnderStudy: string;
  definition?: string;
  createdAt: string;
  updatedAt?: string;
  nextRepeatAt?: string;
};

export type UpdateCardDataInput = {
  termUnderStudy?: string;
  definition?: string;
  nextRepeatAt: string;
};

export type CreateCardDataInput = {
  termUnderStudy: string;
};

export interface CardProviderInterface {
  getAll: () => Promise<Card[]>;
  create: (data: CreateCardDataInput) => Promise<Card>;
  update: (urlId: string, data: UpdateCardDataInput) => Promise<Card>;
  create: (id: string) => Promise<boolean>;
}
