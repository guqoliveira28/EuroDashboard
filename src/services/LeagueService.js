/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 *
 */
class LeagueService {
  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this.matches = matches;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    const teamsArray = [];
    for (const match of this.matches) {
      if (!teamsArray[match.homeTeam]) {
        teamsArray[match.homeTeam] = {
          teamName: match.homeTeam,
          matchesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        };
      }
      if (!teamsArray[match.awayTeam]) {
        teamsArray[match.awayTeam] = {
          teamName: match.awayTeam,
          matchesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        };
      }

      // HOME TEAM
      teamsArray[match.homeTeam].matchesPlayed += match.matchPlayed ? 1 : 0;
      teamsArray[match.homeTeam].goalsFor += match.homeTeamScore;
      teamsArray[match.homeTeam].goalsAgainst += match.awayTeamScore;
      teamsArray[match.homeTeam].points += match.matchPlayed
        ? match.homeTeamScore > match.awayTeamScore
          ? 3
          : match.homeTeamScore == match.awayTeamScore
          ? 1
          : 0
        : 0;

      // AWAY TEAM
      teamsArray[match.awayTeam].matchesPlayed += match.matchPlayed ? 1 : 0;
      teamsArray[match.awayTeam].goalsFor += match.awayTeamScore;
      teamsArray[match.awayTeam].goalsAgainst += match.homeTeamScore;
      teamsArray[match.awayTeam].points += match.matchPlayed
        ? match.awayTeamScore > match.homeTeamScore
          ? 3
          : match.awayTeamScore == match.homeTeamScore
          ? 1
          : 0
        : 0;
    }

    const leaderboard = Object.values(teamsArray).sort((teamA, teamB) => {
      // Sort by points in descending order
      if (teamA.points !== teamB.points) {
        return teamB.points - teamA.points;
      }

      // Tiebreaker 1: Head-to-head points
      const headToHeadPoints = calculateHeadToHeadPoints(
        this.matches,
        teamA.teamName,
        teamB.teamName
      );
      if (headToHeadPoints !== 0) {
        return headToHeadPoints;
      }

      // Tiebreaker 2: Goal difference
      const goalDiffA = teamA.goalsFor - teamA.goalsAgainst;
      const goalDiffB = teamB.goalsFor - teamB.goalsAgainst;
      if (goalDiffA !== goalDiffB) {
        return goalDiffB - goalDiffA;
      }

      // Tiebreaker 3: Scored goals
      if (teamA.goalsFor !== teamB.goalsFor) {
        return teamB.goalsFor - teamA.goalsFor;
      }

      // Tiebreaker 4: Alphabetical order by team name
      return teamA.teamName.localeCompare(teamB.teamName);
    });

    return leaderboard;
  }

  /**
   * Asynchronic function to fetch the data from the server and set the matches.
   */
  async fetchData() {
    const apiURL = "http://localhost:3001/";

    const matches = await fetch(apiURL + "api/v1/getAccessToken")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(async (data) => {
        const token = data.access_token;
        return await fetch(apiURL + "api/v1/getAllMatches", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            return data.matches;
          });
      });
    this.setMatches(matches);
  }
}

function getHeadToHeadMatches(matches, teamA, teamB) {
  return matches.filter((match) => {
    if (!match.matchPlayed) {
      return false;
    }
    const isTeamAMatch = match.homeTeam === teamA || match.awayTeam === teamA;
    const isTeamBMatch = match.homeTeam === teamB || match.awayTeam === teamB;
    return isTeamAMatch && isTeamBMatch;
  });
}

function calculateHeadToHeadPoints(matches, teamA, teamB) {
  const headToHeadStats = {};

  const filteredMatches = getHeadToHeadMatches(matches, teamA, teamB);

  filteredMatches.forEach((match) => {
    if (match.homeTeamScore != match.awayTeamScore) {
      const winningTeam =
        match.homeTeamScore > match.awayTeamScore
          ? match.homeTeam
          : match.awayTeam;
      const losingTeam =
        winningTeam === match.homeTeam ? match.awayTeam : match.homeTeam;

      if (!headToHeadStats[winningTeam]) {
        headToHeadStats[winningTeam] = { points: 0 };
      }
      headToHeadStats[winningTeam].points += 3;

      if (!headToHeadStats[losingTeam]) {
        headToHeadStats[losingTeam] = { points: 0 };
      }
    }
  });

  const teamAPoints = headToHeadStats[teamA]
    ? headToHeadStats[teamA].points
    : 0;
  const teamBPoints = headToHeadStats[teamB]
    ? headToHeadStats[teamB].points
    : 0;

  return teamBPoints - teamAPoints;
}

export default LeagueService;
