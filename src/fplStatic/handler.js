import {range, write} from '../utils';

const teamHandler = staticData => {
  const teamInfo = staticData.teams.map(team => {
    const {id, name, short_name: abbr} = team;
    return {
      id,
      name,
      abbr,
    };
  });
  write('teams', teamInfo, err => console.error(err.stack));
  return teamInfo;
};

const isCurrentFinished = event => event.is_current && event.finished;
const isPreviousFinished = event => event.is_previous && event.finished;

const eventHandler = staticData => {
  const {events} = staticData;
  let gameweek;
  if (events.some(isCurrentFinished)) {
    gameweek = events.filter(isCurrentFinished)[0].id;
  } else if (events.some(isPreviousFinished)) {
    gameweek = events.filter(isPreviousFinished)[0].id;
  } else {
    gameweek = 0;
  }
  return {
    finishedGameweeks: range(1, gameweek),
  };
};

module.exports = {
  teamHandler,
  eventHandler,
};
