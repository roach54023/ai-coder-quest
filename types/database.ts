export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      chapters: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          description: string | null;
          order_index: number;
          rank_id: string | null;
          is_hidden: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          subtitle?: string | null;
          description?: string | null;
          order_index: number;
          rank_id?: string | null;
          is_hidden?: boolean;
        };
        Update: {
          title?: string;
          subtitle?: string | null;
          description?: string | null;
          order_index?: number;
          rank_id?: string | null;
          is_hidden?: boolean;
        };
        Relationships: [];
      };
      levels: {
        Row: {
          id: string;
          chapter_id: string;
          title: string;
          page_title: string | null;
          description: string | null;
          content_mdx: string | null;
          order_index: number;
          is_delivery: boolean;
          verification_type: string;
          verification_config: Json;
          pass_message: string | null;
          hints: string[] | null;
          estimated_minutes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          chapter_id: string;
          title: string;
          page_title?: string | null;
          description?: string | null;
          content_mdx?: string | null;
          order_index: number;
          is_delivery?: boolean;
          verification_type: string;
          verification_config?: Json;
          pass_message?: string | null;
          hints?: string[] | null;
          estimated_minutes?: number;
        };
        Update: {
          chapter_id?: string;
          title?: string;
          page_title?: string | null;
          description?: string | null;
          content_mdx?: string | null;
          order_index?: number;
          is_delivery?: boolean;
          verification_type?: string;
          verification_config?: Json;
          pass_message?: string | null;
          hints?: string[] | null;
          estimated_minutes?: number;
        };
        Relationships: [
          {
            foreignKeyName: "levels_chapter_id_fkey";
            columns: ["chapter_id"];
            isOneToOne: false;
            referencedRelation: "chapters";
            referencedColumns: ["id"];
          }
        ];
      };
      ranks: {
        Row: {
          id: string;
          name: string;
          subtitle: string;
          salary: string;
          chapter_id: string | null;
          badge_color: string;
          badge_icon: string;
          order_index: number;
          share_template: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          subtitle: string;
          salary: string;
          chapter_id?: string | null;
          badge_color: string;
          badge_icon: string;
          order_index: number;
          share_template?: string | null;
        };
        Update: {
          name?: string;
          subtitle?: string;
          salary?: string;
          chapter_id?: string | null;
          badge_color?: string;
          badge_icon?: string;
          order_index?: number;
          share_template?: string | null;
        };
        Relationships: [];
      };
      user_profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          email: string | null;
          username: string | null;
          password_hash: string | null;
          password_salt: string | null;
          github_username: string | null;
          current_rank_id: string;
          total_time_seconds: number;
          started_at: string | null;
          completed_at: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          username?: string | null;
          password_hash?: string | null;
          password_salt?: string | null;
          github_username?: string | null;
          current_rank_id?: string;
          total_time_seconds?: number;
          started_at?: string | null;
          completed_at?: string | null;
          is_admin?: boolean;
        };
        Update: {
          display_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          username?: string | null;
          password_hash?: string | null;
          password_salt?: string | null;
          github_username?: string | null;
          current_rank_id?: string;
          total_time_seconds?: number;
          started_at?: string | null;
          completed_at?: string | null;
          is_admin?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "user_profiles_current_rank_id_fkey";
            columns: ["current_rank_id"];
            isOneToOne: false;
            referencedRelation: "ranks";
            referencedColumns: ["id"];
          }
        ];
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          level_id: string;
          status: string;
          started_at: string | null;
          completed_at: string | null;
          time_spent_seconds: number;
          attempts: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          level_id: string;
          status?: string;
          started_at?: string | null;
          completed_at?: string | null;
          time_spent_seconds?: number;
          attempts?: number;
        };
        Update: {
          status?: string;
          started_at?: string | null;
          completed_at?: string | null;
          time_spent_seconds?: number;
          attempts?: number;
        };
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_progress_level_id_fkey";
            columns: ["level_id"];
            isOneToOne: false;
            referencedRelation: "levels";
            referencedColumns: ["id"];
          }
        ];
      };
      submissions: {
        Row: {
          id: string;
          user_id: string;
          level_id: string;
          submission_type: string;
          text_content: string | null;
          url_content: string | null;
          screenshot_urls: string[] | null;
          status: string;
          auto_verification_result: Json | null;
          reviewer_id: string | null;
          review_comment: string | null;
          reviewed_at: string | null;
          admin_notes: string | null;
          reviewed_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          level_id: string;
          submission_type: string;
          text_content?: string | null;
          url_content?: string | null;
          screenshot_urls?: string[] | null;
          status?: string;
          auto_verification_result?: Json | null;
          reviewer_id?: string | null;
          review_comment?: string | null;
          reviewed_at?: string | null;
          admin_notes?: string | null;
          reviewed_by?: string | null;
        };
        Update: {
          status?: string;
          auto_verification_result?: Json | null;
          reviewer_id?: string | null;
          review_comment?: string | null;
          reviewed_at?: string | null;
          admin_notes?: string | null;
          reviewed_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "submissions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "submissions_level_id_fkey";
            columns: ["level_id"];
            isOneToOne: false;
            referencedRelation: "levels";
            referencedColumns: ["id"];
          }
        ];
      };
      share_records: {
        Row: {
          id: string;
          user_id: string;
          rank_id: string;
          card_image_url: string | null;
          platform: string | null;
          shared_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          rank_id: string;
          card_image_url?: string | null;
          platform?: string | null;
        };
        Update: {
          card_image_url?: string | null;
          platform?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "share_records_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "share_records_rank_id_fkey";
            columns: ["rank_id"];
            isOneToOne: false;
            referencedRelation: "ranks";
            referencedColumns: ["id"];
          }
        ];
      };
      achievements: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          condition_type: string;
          condition_config: Json;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description: string;
          icon: string;
          condition_type: string;
          condition_config?: Json;
        };
        Update: {
          name?: string;
          description?: string;
          icon?: string;
          condition_type?: string;
          condition_config?: Json;
        };
        Relationships: [];
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
        };
        Update: {};
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_achievements_achievement_id_fkey";
            columns: ["achievement_id"];
            isOneToOne: false;
            referencedRelation: "achievements";
            referencedColumns: ["id"];
          }
        ];
      };
      oauth_accounts: {
        Row: {
          id: string;
          user_id: string;
          provider: string;
          provider_account_id: string;
          provider_email: string | null;
          provider_name: string | null;
          provider_avatar: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          provider: string;
          provider_account_id: string;
          provider_email?: string | null;
          provider_name?: string | null;
          provider_avatar?: string | null;
        };
        Update: {
          provider_email?: string | null;
          provider_name?: string | null;
          provider_avatar?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "oauth_accounts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {};
    Functions: {};
  };
}

export type Chapter = Database['public']['Tables']['chapters']['Row'];
export type Level = Database['public']['Tables']['levels']['Row'];
export type Rank = Database['public']['Tables']['ranks']['Row'];
export type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];
export type Submission = Database['public']['Tables']['submissions']['Row'];
export type ShareRecord = Database['public']['Tables']['share_records']['Row'];
export type Achievement = Database['public']['Tables']['achievements']['Row'];
