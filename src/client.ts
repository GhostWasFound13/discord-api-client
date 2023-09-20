import type { UserAgent } from "discord-request";
import { Client } from "discord-request";
import pkg from "../package.json" assert { type: "json" };

export class DiscordApiClient extends Client {
	get userAgent(): UserAgent {
		return super.userAgent;
	}

	set userAgent(value: string | undefined | null) {
		let str = `discord-api ${pkg.version}`;

		if (value) {
			str += ` ${value}`;
		}

		super.userAgent = str;
	}

	// Add a method to send a message to a channel
	async sendMessage(channelId: string, content: string): Promise<void> {
		try {
			await this.post(`/channels/${channelId}/messages`, {
				content,
			});
		} catch (error) {
			console.error("Error sending message:", error);
		}
	}
}

export const client = new DiscordApiClient({
	userAgent: `discord-api ${pkg.version}`,
});
