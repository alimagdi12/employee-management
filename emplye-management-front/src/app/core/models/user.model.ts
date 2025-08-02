export interface User {
  id: string;
  email: string;
  username: string;
  phone: string;
  token?: string;  // Make token optional since it might not always be present
  createdAt?: string;
  updatedAt?: string;
}
