-- Core migration created `properties.id UUID PRIMARY KEY` without a default.
-- Inserts must supply an id (TypeORM @PrimaryGeneratedColumn('uuid') should, but
-- explicit server default keeps raw SQL and edge cases safe).
ALTER TABLE properties ALTER COLUMN id SET DEFAULT gen_random_uuid();
