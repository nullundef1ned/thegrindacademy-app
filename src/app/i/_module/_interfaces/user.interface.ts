export interface IUserStatusUpdate {
  id: string;
  status: string;
  reason?: string;
}

export interface IUserTelegramUpdate {
  id: string;
  telegramUserName: string;
}