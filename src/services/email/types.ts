interface SendEmailType {
	email: string;
	subject: string;
	message: string;
}

interface sendConfirmationEmailInput {
	confirmationCode: string;
	email: string;
}
