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
export default {
    name: 'Alert',
    props: {
        url: String
    },
    methods: {
        copyUrl() {
            const ref = this.$refs.generated_url;
            ref.select();
            ref.setSelectionRange(0, 99999)
            document.execCommand("copy");
        },
    }
}
</script>