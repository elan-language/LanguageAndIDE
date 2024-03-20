export interface Profile {
    name: string;
    globals: string[];
    statements: string[];
    class_members: string[];

    include_profile_name_in_header: boolean;
    can_load_only_own_files: boolean;
}