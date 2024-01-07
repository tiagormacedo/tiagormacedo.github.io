<template>
    <form @submit.prevent='onSubmit'>
        <input type='text' autocomplete='off' class='input__lg' v-model.lazy.trim='label' />

        <button type='submit' class='btn btn__primary btn__lg'> Add </button>
    </form>
</template>

<script>
    export default {
        methods: {
            onSubmit () {
                if (this.label === "") { return; }
                this.$emit('item-added', this.label);
                this.label = "";
            },
        },

        data () { return { label: "" }; },
    };
</script>
