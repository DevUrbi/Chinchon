
export type Player = {
  id: string;
  name: string;
  score: number;
  rebuys: number;
  isEliminated: boolean;
};

export type GameState = {
  players: Player[];
  rebuyLimit: number | null; // null for infinite
};
