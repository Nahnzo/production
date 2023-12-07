import { UserRole } from "features/editableProfileCard/model/consts/const";

export interface User {
  id: number;
  username: string;
  avatar?: string;
  roles?: UserRole[];
}

export interface UserSchema {
  authData?: User;
  _mounted?: boolean;
}
