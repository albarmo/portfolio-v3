import { colors } from "./constant";

export const checkColor = (color: string | undefined) => colors.find(x => x.name === color)?.color || 'currentColor'