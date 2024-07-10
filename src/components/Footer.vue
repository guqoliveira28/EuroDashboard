<template>
    <div class="footer">
        <span>API Version: {{ version }}</span>
    </div>
</template>

<script>
import { inject } from 'vue';

export default {
    data() {
        return {
            version: '0'
        };
    },
    methods: {
        getVersion() {
            const apiURL = inject('apiURL');
            fetch(apiURL + 'api/version')
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((data) => {
                    this.version = data.version;
                })
        }
    },
    mounted() {
        this.getVersion();
    }
}
</script>


<style scoped>
.footer {
    color: #4B5C68;
    background-color: #F6F7F7;
    height: 60px;
    min-width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    position: absolute;
    bottom: 0;
}

.footer span {
    height: fit-content;
    margin: 0 40px;
}
</style>