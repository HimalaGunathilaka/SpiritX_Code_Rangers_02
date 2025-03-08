type PlayerStats = {
    totalRuns: number;
    ballsFaced: number;
    inningsPlayed: number;
    totalWickets: number;
    ballsBowled: number;
    runsConceded: number;
  };
  
  export function calculatePlayerPoints(stats: PlayerStats): number {
    const {
      totalRuns,
      ballsFaced,
      inningsPlayed,
      totalWickets,
      ballsBowled,
      runsConceded,
    } = stats;
  
    // Avoid division by zero
    const battingStrikeRate = ballsFaced > 0 ? (totalRuns / ballsFaced) * 100 : 0;
    const battingAverage = inningsPlayed > 0 ? totalRuns / inningsPlayed : 0;
    const bowlingStrikeRate = totalWickets > 0 ? ballsBowled / totalWickets : Infinity;
    const economyRate = ballsBowled > 0 ? (runsConceded / ballsBowled) * 6 : Infinity;
  
    // Calculate Player Points
    const playerPoints =
      (battingStrikeRate / 5 + battingAverage * 0.8) +
      (500 / bowlingStrikeRate + 140 / economyRate);
    
    const value = (9*playerPoints +100)*1000  
  
    return value;
  }
  
  // Example usage
  const playerStats: PlayerStats = {
    totalRuns: 530,
    ballsFaced: 588,
    inningsPlayed: 10,
    totalWickets: 0, // No wickets taken
    ballsBowled: 3,
    runsConceded: 21,
  };
  
  const playerPoints = calculatePlayerPoints(playerStats);
  console.log(`Player Points: ${playerPoints.toFixed(2)}`);
  