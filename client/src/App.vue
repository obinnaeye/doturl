<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <UrlShortener v-on:new-url="onNewUrl"></UrlShortener>
    <h4>List of shortened urls</h4>
    <ul>
      <li v-for="url in urls" :key="url.shortUrl">
        <Url :url="url.shortUrl" :creationDate="url.createdAt.slice(0, 10)"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Url from './components/Url.vue';
import UrlShortener from './components/UrlShortener.vue';
import ShortUrls from './api/ShortUrls';

@Component({
  components: {
    Url,
    UrlShortener
  },
})

export default class App extends Vue {
  private urls: Array<string> = []
  private shortUrl = ''

  public onNewUrl(url: string): void {
    this.urls.push(url)
  }
  
  beforeCreate() {
    ShortUrls.getUrls()
      .then(data => {
        console.log(data.urls)
        this.urls = data.urls
      })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h4 {
  text-align: left;
  margin: 40px 0 0 15%
}
ul {
  list-style-type: none;
  padding-inline-start: 0;
}
li:first-child > div {
  border-radius: 10px 10px 0 0
}
li:last-child > div {
  border-radius: 0 0 10px 10px
}
.div-70 {
    width: 70%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 2px 0 0 15%;
}
input {
    width: 75%;
}
button {
    width: 20%;
    padding: 0 2%
}
</style>
