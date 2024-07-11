export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string
          endDate: string | null
          guestID: number | null
          id: number
          paid: boolean | null
          price: number | null
          roomID: number | null
          startDate: string | null
          totalGuests: number | null
          totalNights: number | null
        }
        Insert: {
          created_at?: string
          endDate?: string | null
          guestID?: number | null
          id?: number
          paid?: boolean | null
          price?: number | null
          roomID?: number | null
          startDate?: string | null
          totalGuests?: number | null
          totalNights?: number | null
        }
        Update: {
          created_at?: string
          endDate?: string | null
          guestID?: number | null
          id?: number
          paid?: boolean | null
          price?: number | null
          roomID?: number | null
          startDate?: string | null
          totalGuests?: number | null
          totalNights?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'bookings_guestID_fkey'
            columns: ['guestID']
            isOneToOne: false
            referencedRelation: 'guests'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'bookings_roomId_fkey'
            columns: ['roomID']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
        ]
      }
      guests: {
        Row: {
          address: string | null
          created_at: string
          dob: string | null
          email: string | null
          gender: string | null
          id: number
          name: string | null
          phoneNumber: number | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          gender?: string | null
          id?: number
          name?: string | null
          phoneNumber?: number | null
        }
        Update: {
          address?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          gender?: string | null
          id?: number
          name?: string | null
          phoneNumber?: number | null
        }
        Relationships: []
      }
      rooms: {
        Row: {
          bathroom: string | null
          bedroom: string | null
          created_at: string
          id: number
          name: number | null
          price: number | null
        }
        Insert: {
          bathroom?: string | null
          bedroom?: string | null
          created_at?: string
          id?: number
          name?: number | null
          price?: number | null
        }
        Update: {
          bathroom?: string | null
          bedroom?: string | null
          created_at?: string
          id?: number
          name?: number | null
          price?: number | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string
          id: number
          priceMax: number | null
          priceMin: number | null
          priceStep: number | null
          roomThreshold: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          priceMax?: number | null
          priceMin?: number | null
          priceStep?: number | null
          roomThreshold?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          priceMax?: number | null
          priceMin?: number | null
          priceStep?: number | null
          roomThreshold?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
