<template>
    <div class="header">
        <div class="links">
            <router-link to="/" class="image">
                <img src="images/logo.svg" />
            </router-link>
            <div class="menu">
                <router-link to="/groups">
                    <img src="images/groups.png" />
                    Groups
                </router-link>
                <router-link to="/schedule">
                    <img src="images/schedule.png" />
                    Schedule
                </router-link>
                <router-link to="/leaderboard">
                    <img src="images/leaderboard.png" />
                    Leaderboard
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    color: white;
    background-color: #025FEB;
    height: 60px;
    min-width: 100vw;
    display: flex;
    align-items: center;
    font-size: 16px;
}

.header .links {
    width: 100%;
    margin: 0 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px;
}

.header .links a {
    text-decoration: none;
    color: #fff;
}

.header .links .image {
    display: block;
    height: 40px;
    object-fit: contain;
}

.header .links .menu {
    margin-left: auto;
    display: flex;
    gap: 40px;
}

.header .links .menu a {
    display: flex;
    align-items: center;
    gap: 5px;
}

.header .links .menu img {
    height: 25px;
    object-fit: contain;
}
</style>