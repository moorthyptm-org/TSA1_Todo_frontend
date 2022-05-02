export interface IUserReponse {
  message: string;
  data: Users[];
}

export interface Users {
  id: number;
  username: string;
  role: string;
}

export interface IUserUpdateRequestPayload {
  username: string;
  password: string;
  role: string;
}

export interface IMessage {
  message: string;
}
