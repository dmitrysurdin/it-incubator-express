import { emailManager } from './email-manager';
import { SentMessageInfo } from 'nodemailer';
import { authRepositories } from '../../entities/auth/auth.repository';

export const emailService = {
	sendConfirmationEmail: async ({
		email,
		confirmationCode,
	}: sendConfirmationEmailInput): Promise<SentMessageInfo> => {
		return await emailManager.sendConfirmationEmail({ email, confirmationCode });
	},
	resendConfirmationEmail: async (email: string): Promise<SentMessageInfo> => {
		const registeredUser = await authRepositories.findRegistrationUserByEmail(email);

		if (!registeredUser || registeredUser?.emailConfirmation.isConfirmed) {
			throw {
				errorsMessages: [{ field: 'isConfirmed', message: 'user is confirmed or not exited' }],
			};
		}

		return await emailManager.sendConfirmationEmail({
			email,
			confirmationCode: registeredUser.emailConfirmation.confirmationCode,
		});
	},
};
