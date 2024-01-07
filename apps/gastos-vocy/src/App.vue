<template>
    <div id='App'>
        <h1> 
            Gastos de Vôcy 
            
            <form action="https://tmacedo.pythonanywhere.com/setjson/gastos_vocy.json" method="post" enctype="application/json" style="display: inline; float: right;">
                <input type="hidden" id="hiddenInput" name="jsondata"/>
                <button type="submit" class="btn__save" @click='sendData(this.ItemsList)'> Salvar </button>
            </form>
        </h1>

        <ul>
            <li v-for="item in ItemsList" :key="item.id">
                <item-row :data="item.date" :descricao="item.desc" :valor="item.value" @done-editing="toggleOffEdit(item.id, $event)" @delete-item='deleteItem(item.id)'></item-row>
            </li>
        </ul>
        
        <h2 class='list-summary'> Total: {{ this.sumValues }} </h2>

        <add-form @item-added='addItem'></add-form>

        <button class="btn btn__danger btn__lg" style="margin: 1rem 0;" @click="removeAll"> 
            Apagar tudo 
        </button>
    </div>
</template>

<script>
    import AddForm from "./components/AddForm.vue";
    import ItemRow from "./components/ItemRow.vue";
    import axios from "axios";
    import uniqueId from "lodash.uniqueid";


    export default {
        name: 'App',
        
        components: { AddForm, ItemRow },

        computed: {
            sumValues () {
                var s = Number(0);
                if (typeof(this.ItemsList) !== 'undefined' && this.ItemsList.length > 0) {
                    for (const item in this.ItemsList) {
                        s += this.ItemsList[item].value;
                    }
                }
                return s
            }
        },

        data () { 
            return {
                ItemsList: null
            } 
        },

        methods: {
            addItem (texto1, texto2, texto3) {
                this.ItemsList.push({ id: uniqueId("gasto-"), date: texto1, desc: texto2, value: texto3});
            },
            removeAll () {
                if (confirm("Certeza que você que aparagr tudo?")) {
                    this.ItemsList = { };
                }
            },
            toggleOffEdit (stuff, thing) {
                const itemToEdit = this.ItemsList.find((item) => item.id === stuff);
                itemToEdit.isEditing = false;
                itemToEdit.date = thing[0];
                itemToEdit.desc = thing[1];
                itemToEdit.value = thing[2];
                console.log(itemToEdit)
            },
            deleteItem (stuff) {
                const indexToDelete = this.ItemsList.findIndex((item) => item.id === stuff);
                this.ItemsList.splice(indexToDelete, 1);
            },
            sendData (stuff) {
                const outData = JSON.stringify(stuff);
                document.getElementById('hiddenInput').value = outData;
            }
        },
        
        created () {
            // Fetch JSON data from Python Any Where //
            const url = "https://tmacedo.pythonanywhere.com/getjson/gastos_vocy.json";
            axios.get(url).then((response) => {
                this.ItemsList = JSON.parse(response.data.message);
            });
        }
    };
</script>

<style>
  /* Global styles */
  .btn {
    padding: 0.8rem 1rem 0.7rem;
    border: 0.2rem solid #4d4d4d;
    cursor: pointer;
    text-transform: capitalize;
  }
  .btn__danger {
    color: #fff;
    background-color: #ca3c3c;
    border-color: #bd2130;
  }
  .btn__filter {
    border-color: lightgrey;
  }
  .btn__danger:focus {
    outline-color: #c82333;
  }
  .btn__primary {
    color: #fff;
    background-color: #000;
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
  }
  .btn-group > * {
    flex: 1 1 auto;
  }
  .btn-group > * + * {
    margin-left: 0.8rem;
  }
  .btn__save {
    font-size: 50%;
    color: #c82333;
    padding: 1rem 1rem 1rem 1rem;
    border: 0.2rem solid #c82333;
    cursor: pointer;
    text-transform: capitalize;
  }
  .label-wrapper {
    margin: 0;
    flex: 0 0 100%;
    text-align: center;
  }
  [class*="__lg"] {
    display: inline-block;
    width: 100%;
    font-size: 1.9rem;
  }
  [class*="__lg"]:not(:last-child) {
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 620px) {
    [class*="__lg"] {
      font-size: 2.4rem;
    }
  }
  .visually-hidden {
    position: absolute;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }
  [class*="stack"] > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  .stack-small > * + * {
    margin-top: 1.25rem;
  }
  .stack-large > * + * {
    margin-top: 2.5rem;
  }
  @media screen and (min-width: 550px) {
    .stack-small > * + * {
      margin-top: 1.4rem;
    }
    .stack-large > * + * {
      margin-top: 2.8rem;
    }
  }
  /* End global styles */
  #app {
    background: #fff;
    margin: 2rem 0 4rem 0;
    padding: 1rem;
    padding-top: 0;
    position: relative;
    box-shadow:
      0 2px 4px 0 rgb(0 0 0 / 20%),
      0 2.5rem 5rem 0 rgb(0 0 0 / 10%);
  }
  @media screen and (min-width: 550px) {
    #app {
      padding: 4rem;
    }
  }
  #app > * {
    max-width: 100rem;
    margin-left: auto;
    margin-right: auto;
  }
  #app > form {
    max-width: 100%;
  }
  #app h1 {
    display: block;
    min-width: 100%;
    width: 100%;
    text-align: center;
    margin: 0;
    margin-bottom: 5rem;
  }
  #app h2.list-summary{
    text-align: right;
    font-size: large;
    margin-bottom: 2rem;
  }
</style>



    