import {write} from '../utils';

const fixturesHandler = fixtures => {
  if (fixtures.length === 0) throw new Error('Fixture does not exist');
  const data = fixtures.map(fixture => {
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
  write(`fixture${data[0].gameweek}`, data, err => console.error(err.stack));
  return data;
};

module.exports = {
  fixturesHandler,
};
