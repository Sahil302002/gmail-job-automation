function detectEmailBounces() {

const sheet = SpreadsheetApp
.getActiveSpreadsheet()
.getSheetByName("Sheet2");

const data = sheet.getDataRange().getValues();

const threads = GmailApp.search(
'from:(mailer-daemon OR postmaster) newer_than:30d'
);

for (const thread of threads) {


const messages = thread.getMessages();

for (const msg of messages) {

  const body =
    msg.getPlainBody().toLowerCase();

  let bounceType = "";
  let bounceReason = "";

  // Hard Bounce Detection

  if (
    body.includes("address not found") ||
    body.includes("user unknown") ||
    body.includes("recipient address rejected") ||
    body.includes("no such user") ||
    body.includes("does not exist")
  ) {

    bounceType = "Hard Bounce";

    if (body.includes("address not found")) {
      bounceReason = "Address not found";
    }
    else if (body.includes("user unknown")) {
      bounceReason = "User unknown";
    }
    else if (body.includes("recipient address rejected")) {
      bounceReason = "Recipient address rejected";
    }
    else if (body.includes("no such user")) {
      bounceReason = "No such user";
    }
    else {
      bounceReason = "Mailbox does not exist";
    }

  }

  // Soft Bounce Detection

  else if (
    body.includes("mailbox full") ||
    body.includes("quota exceeded") ||
    body.includes("temporary failure") ||
    body.includes("try again later")
  ) {

    bounceType = "Soft Bounce";

    if (body.includes("mailbox full")) {
      bounceReason = "Mailbox full";
    }
    else if (body.includes("quota exceeded")) {
      bounceReason = "Quota exceeded";
    }
    else if (body.includes("temporary failure")) {
      bounceReason = "Temporary failure";
    }
    else {
      bounceReason = "Try again later";
    }

  }

  if (!bounceType) {
    continue;
  }

  // Extract email address from bounce message

  const emailMatch =
    body.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );

  if (!emailMatch) {
    continue;
  }

  const failedEmail =
    emailMatch[0].toLowerCase();

  // Find matching email in sheet

  for (let i = 1; i < data.length; i++) {

    const sheetEmail =
      String(data[i][1] || "")
      .trim()
      .toLowerCase();

    if (sheetEmail === failedEmail) {

      sheet
        .getRange(i + 1, 5)
        .setValue(bounceType);

      sheet
        .getRange(i + 1, 7)
        .setValue(bounceReason);

      Logger.log(
        `Updated ${failedEmail} => ${bounceType}`
      );

      break;
    }

  }

}

}

}
