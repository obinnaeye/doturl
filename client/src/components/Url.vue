<template>
    <div class="short-url">
        <div class="url">
            <a :href="url">{{ url }}</a>
        </div>
        <div class="date">Created on: {{ creationDate }}</div>
    </div>
</template>

<script>
export default {
    name: 'Url',
    props: {
        url: String,
        creationDate: String
    }
}
</script>
<style>
.short-url {
    width: 70%;
    background: lightsteelblue;
    display: flex;
    flex-direction: row;
    margin-top: 2px;
    margin-left: 15%
}
.url {
    text-align: left;
    width: 70%;
    padding: 0.1% 2%;

}
.date {
    width: 30%;
    text-align: left;
    padding: 0.1% 2%;
}
@media (max-width:760px){
    .date, .url {
        width: 100%;
        padding-left: 5%
    }
    .short-url {
        flex-direction: column
    }

}
@media (max-width:950px){
    .date, .url {
        width: 50%;
    }

}
</style>
