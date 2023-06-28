CREATE TABLE `sales` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`customer_name` text,
	`customer_phone` text NOT NULL,
	`customer_address` text,
	`product_category` text NOT NULL,
	`quantity` int NOT NULL,
	`amount` int NOT NULL,
	`code` text NOT NULL,
	`profit` int NOT NULL,
	`dealer_code` text,
	`payment_mode` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()));
