const teamHandler = staticData =>
  staticData.teams.map(team => {
    const {id, name, short_name: abbr} = team;
    return {
      id,
      name,
      abbr,
    };
  });

module.exports = {
  teamHandler,
};
