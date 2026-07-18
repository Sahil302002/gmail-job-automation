# Check Gmail Daily Quota

## Purpose

Checks the remaining Gmail daily email sending quota available for the current Google account.

## Features

- Retrieves the remaining daily email quota.
- Logs the available email count in the Apps Script execution logs.
- Helps prevent exceeding Gmail's daily sending limits before running bulk email automation.

## Google Service Used

- MailApp

## Input

No input required.

## Output

Displays the remaining daily email quota in the Apps Script logs.

Example:

```text
Remaining Daily Quota: 1475
```

## Usage

Run the `checkQuota()` function before executing the email automation script to verify that sufficient email quota is available.

## Notes

- The quota resets every 24 hours based on Google's quota policy.
- The available quota depends on the Google account type (Personal Gmail or Google Workspace).
- This function is intended for monitoring only and does not send any emails.