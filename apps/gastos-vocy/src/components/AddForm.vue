<template>
    <!-- Two line form to add an item to a list of items -->
    <form @submit.prevent='onSubmit'>
        <!-- Three input fields: a date (date), a text (desc), and a number (value) -->
        <input type='date' style="margin: 0.5rem 0.5rem 0.5rem 0;" v-model.lazy.trim="date" placeholder="data" />
        <input type='text' size=37 style="margin: 0.5rem 0.5rem 0.5rem 0.5rem;" v-model.lazy.trim="desc" placeholder="descrição" />
        <input type='number' style="margin: 0.5rem 0 0.5rem 0.5rem;" v-model.lazy.trim="value" placeholder="valor" />
        
        <!-- A button to push the input into the items list -->
        <button type='submit' class='btn btn__primary btn__lg'> Adicionar item </button>
    </form>
</template>

<script>
    export default {
        methods: {
            onSubmit () {
                if (this.date === "" || this.desc === "" || this.value === "") { return; }
                this.$emit('item-added', this.date, this.desc, this.value);
                this.date = "";
                this.desc = "";
                this.value = "";
            },
        },

        data () { 
            return { 
                date: "", 
                desc: "", 
                value: "" 
            }; 
        }
    };
</script>
