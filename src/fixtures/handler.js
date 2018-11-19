const fixturesHandler = fixtures =>
  fixtures.map(fixture => {
    const {
      kickoff_time: kickoffTime,
      event: gameweek,
      team_h_score,
      team_a_score,
      team_h,
      team_a,
    } = fixture;
    return {
      kickoffTime,
      gameweek,
      teams: {
        home: team_h,
        away: team_a,
      },
      score: {
        home: team_h_score,
        away: team_a_score,
      },
    };
  });

module.exports = {
  fixturesHandler,
};
