# Manual - Google Ads Weekly Spend Monitoring Script

This JavaScript script is designed for Google Ads and serves the purpose of monitoring weekly campaign Ad spend. It provides email notifications in cases where the campaign's spending exceeds or falls short of the target by a margin of 10% or more.

Getting Started

1. Prepare the Google Sheet: https://docs.google.com/spreadsheets/d/1EdQj7lsxZO_9i0K3XhVRUs76z-M7m8mgYaXH2tgmf-M/edit?usp=sharing
- Go to the Google Sheet Link.
- Make a copy of the Sheet.
- Fill in the exact campaign names and their monthly budgets in the yellowish fields.
- Rename the tab(s) with the exact campaign name.
- Optionally, add more tabs if you have more campaigns to monitor.
- Go to the last tab, "Overspending Alert Weekly Budget."
- Add the account number, client's name, campaign names, and email addresses where you want to receive alert emails.


2. Copy and Insert the Script:
- Copy the budget_script.js from this repository.
- In your Google Ads Account, navigate to "Tools and Settings" > "Scripts."
- Add a new script.
- Insert the script and place the URL of your Google Sheet between the square brackets.
- Preview it (you may need to authorize the script) and save it.
- Please Note:

If you wish to test the script, consider temporarily adjusting the budget in the Google Sheet. Because if everything is working correctly and Google Ads is not over or underspending in the current week, you won't receive an email.

IMPORTANT:
- Only modify the yellowish fields in the Google Sheet.
- The Google Sheet contains extra columns for use in a Budget Monitoring Dashboard in Looker Studio, which is not covered in this GitHub repository.
- If the script is not functioning, ensure you haven't removed the square brackets "[ ]" when inserting the Google Sheet URL.
- Do not change the name of the last tab; it must remain "Overspending Alert Weekly Budget."


For detailed instructions, refer to my tutorial video: https://github.com/NDG-Remote/G-Ads_budget_check/blob/main/Tutorial.mp4
