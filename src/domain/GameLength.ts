export const GameLength = {
	Long: 10,
	Medium: 7,
	Short: 4,
} as const;

export type GameLength = (typeof GameLength)[keyof typeof GameLength];
