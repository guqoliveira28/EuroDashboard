<template>
    <h1>League Standings</h1>
    <section class="content">
        <p v-if="leaderboard.length < 1" class="no-data">There are standings</p>
        <table v-else>
            <thead>
                <tr>
                    <td class="team">Team Name</td>
                    <td>MP</td>
                    <td>GF</td>
                    <td>GA</td>
                    <td>Points</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(team, index) in leaderboard" :key="index">
                    <td class="team">
                        <div>
                            <img :src=getImageURL(team.teamName) class="team-img" />
                            {{ team.teamName }}
                        </div>
                    </td>
                    <td>{{ team.matchesPlayed }}</td>
                    <td>{{ team.goalsFor }}</td>
                    <td>{{ team.goalsAgainst }}</td>
                    <td>{{ team.points }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import LeagueService from '../services/LeagueService';

let leaderboard = ref([]);

function getImageURL(team) {
    return `https://flagsapi.codeaid.io/${team}.png`;
}

onMounted(async () => {
    const leagueService = new LeagueService();
    await leagueService.fetchData();
    leaderboard.value = leagueService.getLeaderboard();
});
</script>

<style scoped>
h1 {
    margin: 60px auto 20px;
    font-size: 24px;
    width: fit-content;
    color: #182C62;
}

.no-data {
    margin: 0 20px;
}

.content {
    width: 100%;
}

.content table {
    width: 90%;
    margin: auto;
    border-spacing: 0;
    text-align: left;
    color: #4B5C68;
}

.content thead {
    background: #E4EDF2;
    font-size: 12px;
    font-weight: bold;
    height: 40px;
}

.content td {
    padding: 0 10px;
    text-align: center;
    font-weight: bold;
}

.content .team {
    text-align: left;
}

.content tbody tr {
    height: 70px;
    font-size: 14px;
}

.content tbody tr td {
    border-top: 1px solid #E4EDF2;
}

.content tbody tr:first-child td {
    border-top: none;
}

.content tbody tr .team div {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-start;
}

.content tbody .team-img {
    height: 37px;
    width: 53px;
}
</style>