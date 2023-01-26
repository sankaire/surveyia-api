export default interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}
export interface ITokenPayload {
  iat: number;
  exp: number;
  data: string;
}
