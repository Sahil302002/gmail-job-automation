# Job Application Email Automation

## Purpose

Automates the process of sending personalized job application emails to recruiters using data stored in a Google Sheet.

## Features

- Reads recruiter details from Google Sheets.
- Validates email addresses before sending.
- Generates personalized email content using recruiter and company information.
- Attaches a resume from Google Drive.
- Includes LinkedIn and GitHub profile links in the email.
- Sends emails in HTML format for better readability.
- Tracks email status and sent timestamp.
- Records failed email attempts with the corresponding error message.
- Limits the number of emails sent per execution to avoid exceeding Gmail sending limits.

## Google Services Used

- GmailApp
- SpreadsheetApp
- DriveApp

## Input

Google Sheet containing:

| Column | Description |
|--------|-------------|
| A | HR Name |
| B | HR Email |
| D | Company Name |
| E | Email Status |
| F | Sent Timestamp |
| G | Error Message |

## Output

Updates the spreadsheet by:

- Marking emails as **Sent** or **Failed**.
- Recording the email sent timestamp.
- Logging any errors encountered during email delivery.

## Workflow

1. Reads recruiter details from Google Sheets.
2. Validates email addresses.
3. Skips emails that have already been processed.
4. Generates a personalized email.
5. Attaches the resume from Google Drive.
6. Sends the email via Gmail.
7. Updates the spreadsheet with the email status and timestamp.
8. Waits 15 seconds before sending the next email.

## Notes

- Processes a maximum of **20 emails per execution**.
- Uses HTML formatting for professional email presentation.
- Helps automate job applications while maintaining a complete sending history.