import { supabase } from './supabaseClient';

    const initializeDatabase = async () => {
      try {
        // Check if the reminders table exists
        const { data: tableExists, error: tableCheckError } = await supabase
          .from('reminders')
          .select('*')
          .limit(1);

        if (tableCheckError && tableCheckError.code !== '42P01') {
          throw tableCheckError;
        }

        if (!tableExists) {
          // Create reminders table if it doesn't exist
          const { error: createTableError } = await supabase.rpc(`
            CREATE TABLE IF NOT EXISTS reminders (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              created_at TIMESTAMPTZ DEFAULT NOW(),
              text TEXT NOT NULL,
              time TIMESTAMPTZ NOT NULL,
              user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
            );
          `);

          if (createTableError) throw createTableError;

          // Enable Row Level Security
          const { error: rlsError } = await supabase.rpc(`
            ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
          `);

          if (rlsError) throw rlsError;

          // Create access policy
          const { error: policyError } = await supabase.rpc(`
            CREATE POLICY "Users can manage their own reminders"
            ON reminders
            FOR ALL
            USING (auth.uid() = user_id)
            WITH CHECK (auth.uid() = user_id);
          `);

          if (policyError) throw policyError;

          console.log('Database schema initialized successfully');
        }
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    export const initializeSupabase = async () => {
      await initializeDatabase();
    };
