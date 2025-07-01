export interface Individual {
  userName: string;
  profileName: string;
  colourScheme?: string;
  antiPlagiarism?: boolean;
}

export interface Group {
  groupName: string;
  members: string[];
  profileName: string;
  antiPlagiarism?: boolean;
}

export interface UserConfig {
  students: Individual[];
  groups: Group[];
  teachers: string[];
}
