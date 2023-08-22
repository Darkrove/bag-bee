CREATE TABLE `invoice` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`customer_name` text,
	`customer_phone` text NOT NULL,
	`customer_address` text,
	`cashier_name` text NOT NULL,
	`total_amount` int NOT NULL,
	`total_profit` int NOT NULL,
	`total_quantity` int NOT NULL,
	`payment_mode` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()));
--> statement-breakpoint
CREATE TABLE `invoice_items` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`invoice_id` int NOT NULL,
	`product_category` text NOT NULL,
	`quantity` int NOT NULL,
	`price` int NOT NULL,
	`amount` int NOT NULL,
	`code` text NOT NULL,
	`profit` int NOT NULL,
	`dealer_code` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()));
