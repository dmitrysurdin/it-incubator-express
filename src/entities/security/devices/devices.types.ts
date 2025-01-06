export interface DeviceSessionDbModel {
	ip: string;
	title: string;
	deviceId: string;
	lastActiveDate: string;
	expiresAt: string;
}

export interface DeviceSessionClientModel {
	ip: string;
	title: string;
	deviceId: string;
	lastActiveDate: string;
}
