-- Migration: Add site settings table, service sort order, and QRIS image support
-- Date: 2026-03-09

-- Add sort_order column to services for custom ordering
ALTER TABLE services 
  ADD COLUMN sort_order INT DEFAULT 0 AFTER image;

-- Add QRIS image URL column to payment_methods
ALTER TABLE payment_methods 
  ADD COLUMN qris_image_url VARCHAR(500) NULL AFTER details;

-- Create site_settings table if it does not exist
CREATE TABLE IF NOT EXISTS site_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed default settings (safe to run multiple times because of UNIQUE + IGNORE)
INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES
('contact_address_line1', 'Jl. Raya panongan Kec. Panongan Kab. Tangerang'),
('contact_address_line2', 'Provinsi Banten'),
('contact_phone', '089646829459'),
('contact_email', 'edo19priyatno@gmail.com'),
('contact_maps_embed', 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3965.688906306652!2d106.532421074991!3d-6.304542493684667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTgnMTYuNCJTIDEwNsKwMzInMDYuMCJF!5e0!3m2!1sen!2sid!4v1753360840035!5m2!1sen!2sid'),
('payment_whatsapp_number', '6289646829459'),
('services_all_package_label', 'All Package'),
('studio_options', '["Studio 1","Studio 2"]');

