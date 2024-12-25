import { emailManager } from './email-manager';
import { SentMessageInfo } from 'nodemailer';
import { authRepositories } from '../../entities/auth/auth.repository';
import { v4 as uuidv4 } from 'uuid';

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
				errorsMessages: [{ message: 'user is confirmed or not exited', field: 'isConfirmed' }],
			};
		}

		const newConfirmationCode = uuidv4();

		await authRepositories.updateConfirmationCodeById(
			registeredUser._id.toString(),
			newConfirmationCode,
		);

		return await emailManager.sendConfirmationEmail({
			email,
			confirmationCode: newConfirmationCode,
		});
	},
};
