<template>
    <h1>League Schedule</h1>
    <section class="content">
        <p v-if="matches.length < 1" class="no-data">There are no scheduled matches</p>
        <table v-else>
            <thead>
                <tr>
                    <td class="date-time" v-if="width > 500">Date/Time</td>
                    <td v-if="width > 750">Stadium</td>
                    <td class="home-team">Home Team</td>
                    <td class="score"></td>
                    <td>Away Team</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(match, index) in matches" :key="index">
                    <td class="date-time" v-if="width >= 500">
                        <div>{{ formatDate(new Date(match.matchDate)) }}</div>
                        <div>{{ formatTime(new Date(match.matchDate)) }}</div>
                    </td>
                    <td v-if="width > 750">{{ match.stadium }}</td>
                    <td class=" home-team team">
                        <div>
                            {{ match.homeTeam }}
                            <img :src=getImageURL(match.homeTeam) class="team-img" />
                        </div>
                    </td>
                    <td class="score">
                        <template v-if="match.matchPlayed">
                            {{ match.homeTeamScore }} : {{ match.awayTeamScore }}
                        </template>
                        <template v-else>
                            -:-
                        </template>
                    </td>
                    <td class="team">
                        <div>
                            <img :src=getImageURL(match.awayTeam) class="team-img" />
                            {{ match.awayTeam }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import LeagueService from '../services/LeagueService';

let matches = ref([]);
const width = ref(window.innerWidth);

function formatDate(date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

function formatTime(date) {
    return `${date.getHours()}:${date.getMinutes()}`;
};

function getImageURL(team) {
    return `https://flagsapi.codeaid.io/${team}.png`;
}

onMounted(async () => {
    const leagueService = new LeagueService();
    await leagueService.fetchData();
    matches.value = leagueService.getMatches();
    window.addEventListener('resize', () => {
        width.value = window.innerWidth;
    });
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
}

.content .score {
    text-align: center;
    font-weight: bold;
}

.content .home-team {
    text-align: right;
}

.content .date-time {
    text-align: right;
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


.content tbody tr:nth-child(even) {
    background-color: #F6F7F7;
}

.content tbody tr .team div {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-start;
}

.content tbody tr .home-team div {
    justify-content: flex-end;
}

.content tbody .team-img {
    height: 37px;
    width: 53px;
}
</style>