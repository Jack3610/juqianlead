CREATE TABLE `leadSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contactName` varchar(80) NOT NULL,
	`companyName` varchar(160) NOT NULL,
	`phone` varchar(24) NOT NULL,
	`email` varchar(320),
	`interest` varchar(160) NOT NULL,
	`message` text,
	`privacyConsentAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leadSubmissions_id` PRIMARY KEY(`id`)
);
