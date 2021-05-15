declare global {
  namespace Express {
    interface Session {
      something: string;
    }
  }
}
