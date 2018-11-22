import {write} from '../utils';

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
module.exports = {
  teamHandler,
};
