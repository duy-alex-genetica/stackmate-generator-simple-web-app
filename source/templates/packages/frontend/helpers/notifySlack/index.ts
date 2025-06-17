import { env } from '@/helpers/env';

const SLACK_WEBHOOK_URL = env("SLACK_WEBHOOK_URL") || "";
const SLACK_USERNAME = env("SLACK_USERNAME") || "";

export async function notifySlack(
  {
    submittedAt,
    profileId,
    firstName,
    lastName,
    nationalId,
    contactNumber,
    reason,
    folderLink,
    referralCode,
  }: {
    submittedAt: string;
    profileId: string;
    firstName: string;
    lastName: string;
    nationalId: string;
    contactNumber: string;
    reason: string;
    folderLink: string;
    referralCode: string;
  }) {
  const webhookUrl = SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const payload = {
    username: SLACK_USERNAME,
    icon_url: '',
    attachments: [
      {
        color: "#2eb886",
        blocks: [
          {
            type: "section",
            text: { type: "mrkdwn", text: "*New Submission Received*" },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Submitted at:*\n${submittedAt}` },
              { type: "mrkdwn", text: `*Profile ID:*\n${profileId}` },
              { type: "mrkdwn", text: `*First Name:*\n${firstName}` },
              { type: "mrkdwn", text: `*Last Name:*\n${lastName}` },
              { type: "mrkdwn", text: `*National ID:*\n\`${nationalId}\`` },
              { type: "mrkdwn", text: `*Contact Number:*\n\`${contactNumber}\`` },
              { type: "mrkdwn", text: `*Reason to Join:*\n${reason}` },
              { type: "mrkdwn", text: `*Referral code:*\n${referralCode}` },
              { type: "mrkdwn", text: `*National ID Upload:*\n<${folderLink}|View Upload>` },
            ],
          },
        ],
      },
    ],
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
