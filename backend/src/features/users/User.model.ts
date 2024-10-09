export default interface User {
  id: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  avatar?: string; // not required
  created_at?: Date;
  updated_at?: Date;

  // phrasal_verb User_Phrasal_Verb[]
}
