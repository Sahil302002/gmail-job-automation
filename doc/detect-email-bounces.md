# Detect Email Bounces

## Purpose

Automatically detects bounced emails from Gmail and updates the corresponding status in a Google Sheet.

## Features

- Scans recent bounce emails from **Mailer-Daemon** and **Postmaster**.
- Identifies **Hard Bounce** and **Soft Bounce** messages.
- Extracts the failed recipient's email address.
- Matches the email with records in Google Sheets.
- Updates the bounce type and bounce reason in the spreadsheet.
- Logs each updated record for auditing.

## Google Services Used

- GmailApp
- SpreadsheetApp

## Input

- Bounce notification emails from Gmail.
- Google Sheet containing recipient email addresses.

## Output

Updates the Google Sheet with:
- Bounce Type (Hard Bounce / Soft Bounce)
- Bounce Reason (e.g., Address not found, Mailbox full)

## Usage

Run the `detectEmailBounces()` function after sending job application emails to identify undelivered messages and keep the tracking sheet up to date.

## Notes

- Checks bounce emails received within the last 30 days.
- Supports common hard and soft bounce scenarios.
- Helps maintain an accurate and clean list of recruiter email addresses.