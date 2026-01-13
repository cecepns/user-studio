-- Rename wedding_date to shooting_date in orders table
-- This migration renames the wedding_date column to shooting_date to better reflect the studio photography booking context
-- Note: This is optional - you can skip this if you want to keep wedding_date

-- Rename column in orders table
ALTER TABLE orders 
CHANGE COLUMN wedding_date shooting_date DATE;
