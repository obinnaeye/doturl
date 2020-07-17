<template>
    <div>
        <h4>Your shortened Url is here:</h4>
        <div class="div-70">
            <input ref="generated_url" :value="url"> 
            <button @click="copyUrl" >Copy</button>
        </div>
    </div>
</template>
<script>
import copy from "../helpers/copy";
export default {
    name: 'Alert',
    props: {
        url: String
    },
    methods: {
        copyUrl() {
            const ref = this.$refs.generated_url;
            copy(ref)
        },
    }
}
</script>