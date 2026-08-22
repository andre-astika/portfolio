CREATE TABLE `inquiryRateLimits` (
	`keyHash` varchar(64) NOT NULL,
	`attempts` int NOT NULL,
	`windowStartedAt` timestamp NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inquiryRateLimits_keyHash` PRIMARY KEY(`keyHash`)
);
