<style lang="less" scoped>

</style>
<template>
    <div class="project">
        {{project.project_name}}
    </div>
</template>
<script>
import axios from 'axios';

export default {
    props: ['project'],
    data() {

        return {

        };
    },
    methods: {

    }
}
</script>