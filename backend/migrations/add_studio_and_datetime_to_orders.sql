-- Add studio column and change shooting_date to DATETIME in orders table
-- This migration adds studio selection and changes date to datetime to support time selection
-- Note: Run this migration carefully. If column already exists, you may need to comment out that part.

-- Add studio column
-- If column already exists, comment out the line below
ALTER TABLE orders 
ADD COLUMN studio VARCHAR(50) NULL AFTER shooting_date;

-- Change shooting_date from DATE to DATETIME to support time selection
-- Note: This will preserve existing date values, setting time to 00:00:00
-- If column is already DATETIME, this will have no effect
ALTER TABLE orders 
MODIFY COLUMN shooting_date DATETIME NULL;
