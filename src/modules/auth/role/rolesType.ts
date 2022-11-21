export interface RolesType {
  roles: Array<string>;
}

export interface TokenType extends RolesType {
  userId?: number;
}
export type RequestWithToken = Request & {
  user: TokenType;
};
