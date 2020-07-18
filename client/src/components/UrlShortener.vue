<template>
    <div>
    <div class="url-shortener div-70">
        <input ref="long_url" placeholder="Please enter the url you want to shorten">
        <button id="shorten-url" @click="shortenUrl">Shorten URL</button>
    </div>
    <Alert :url="url" />
    </div>
</template>
<script>
import ShortUrls from '../api/ShortUrls'
import Alert from './Alert'
export default {
    data: () => {
        return {
            url: ''
        }
    },
    name: 'UrlShortener',
    components: {
        Alert
    },
    methods: {
        shortenUrl() {
            const url = this.$refs.long_url.value
            ShortUrls.shortenUrl(url)
                .then(data => {
                    this.url = data.url.shortUrl
                    if (data.status === 200) {
                        this.$emit('newUrl', data.url)
                    }
                })
        }
    }
}
</script>
