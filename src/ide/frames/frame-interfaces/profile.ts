export interface Profile {
  name: string;
  globals: string[];
  statements: string[];
  class_members: string[];

  require_log_on: boolean;
  can_load_only_own_files: boolean;
  show_user_and_profile: boolean;
}

export const defaultUsername = "guest";
