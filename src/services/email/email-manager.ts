import { emailAdapter } from './email-adapter';
import { SentMessageInfo } from 'nodemailer';

export const emailManager = {
	sendConfirmationEmail: async ({
		email,
		confirmationCode,
	}: sendConfirmationEmailInput): Promise<SentMessageInfo> => {
		return await emailAdapter.sendEmail({
			email,
			subject: 'Confirm account',
			message: `
		<h1>Thank you for your registration</h1>
		<p>
			To finish registration, please follow the link below:
			<a href="https://somesite.com/confirm-email?code=${confirmationCode}">
				Complete registration
			</a>
		</p>
	`,
		});
	},
};
