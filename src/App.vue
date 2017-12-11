<style>
* {
    margin: 0;
    padding: 0;
    border: 0;
}
ul {
    list-style: none;
}
a, a:link, a:active, a:visited {
    text-decoration: none;
    color: inherit;
}

html, body {
    height: 100%;
}
#app {
    height: 100%;
    font-family: '微软雅黑', sans-serif;
    min-width: 800px;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
body {
    
}
</style>

<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>


