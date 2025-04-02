export interface User {
  userName: string;
  profileName: string;
  colourScheme?: string;
}

export interface UserConfig {
  users: User[];
}
