import nodemailer, { SentMessageInfo } from 'nodemailer';
import { SETTINGS } from '../../settings';

export const emailAdapter = {
	sendEmail: async ({ email, subject, message }: SendEmailType): Promise<SentMessageInfo> => {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: SETTINGS.EMAIL,
				pass: SETTINGS.EMAIL_PASSWORD,
			},
		});

		return await transporter.sendMail({
			subject,
			from: `Dmitrii Surdin <${SETTINGS.EMAIL}>`,
			to: email,
			html: message,
		});
	},
};
