<template>
    <div @editing-item="editItem" style="display: inline;">
        <div style="display: flex; justify-content: space-between; margin: 0.5rem auto;" v-if="!isEditing">
            <div style="display: inline; padding: 0.5rem 1rem 0.5rem 2rem;">
                {{ data }}
            </div>
            <div style="display: inline; padding: 0.5rem 1rem 0.5rem 1rem;">
                {{ descricao }}
            </div>
            <div style="display: inline; padding: 0.5rem 2rem 0.5rem 1rem;">
                {{ valor }}
            </div>
            <div>
                <button style="padding: 0 0.5rem 0 0.5rem; margin: 0 0.5rem 0 0.5rem; border: solid 1pt #000; border-radius: 10pt; background-color: #3a3; color: #fff" @click="toggleOnEdit">U</button>
                <button style="padding: 0 0.5rem 0 0.5rem; margin: 0 0.5rem 0 0.5rem; border: solid 1pt #000; border-radius: 10pt; background-color: #d33; color: #fff" @click="this.$emit('delete-item')">X</button>
            </div>
        </div>
        <form v-else @submit.prevent='onSubmit' style="display: flex; justify-content: space-between; margin: 0.5rem auto;">
            <input type='date' style="margin: 0 0.5rem 0.5rem 0;" v-model.lazy.trim="newDate"/>
            <input type='text' size=37 style="margin: 0 0.5rem 0.5rem 0.5rem;" v-model.lazy.trim="newDesc"/>
            <input type='number' style="margin: 0 0 0.5rem 0.5rem;" v-model.lazy.trim="newValue" />
            <div style="display: inline; position: relative; float: right; margin: 0 0.5rem 0.5rem 0.5rem;">
                <button type="submit" style="padding: 0 0.5rem 0 0.5rem; margin: 0rem 0.5rem 0 0.5rem; border: solid 1pt #33a; border-radius: 10pt; background-color: #33a; color: #fff" @click="onSubmit">V</button>
                <button style="padding: 0 0.5rem 0 0.5rem; margin: 0 0.5rem 0 0.5rem; border: solid 1pt #e95; border-radius: 10pt; background-color: #e95; color: #fff" @click="toggleOffEdit">></button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        props: {
            data: { required: true, type: String },
            descricao: { required: true, type: String },
            valor: { required: true, type: Number }
        },
        
        data () {
            return {
                isEditing: false
            };
        },
        
        methods: {
            toggleOnEdit () {
                this.$emit('edit-item');
                this.isEditing = true;
            },
            onSubmit () {
                const coisa = [this.newDate, this.newDesc, this.newValue];
                this.$emit("done-editing", coisa);
                this.isEditing = false;
            },
            toggleOffEdit () {
                this.$emit("cancel-edit");
                this.isEditing = false
            }
        }
    }
</script>