<template>
    <div id='App'>
        <h1> 
            To do list 
            
            <form action="https://tmacedo.pythonanywhere.com/setjson/json_data.json" method="post" enctype="application/json" style="display: inline; float: right;">
                <input type="hidden" id="hiddenInput" name="jsondata"/>
                <button type="submit" class="btn__save" @click='sendData(this.TodoItems)'> Save </button>
            </form>
        </h1>

        <ul aria-labelledby='list-summary' class='stack-large'>
            <li v-for="item in TodoItems" :key="item.id">
                <todo-item :label="item.label" :done="item.done" :id="item.id" @checkbox-changed='updateDone(item.id)' @item-deleted="deleteItem(item.id)" @item-edited="editItem(item.id, $event)"></todo-item>
            </li>
        </ul>

        <h2 class='list-summary'> {{listSummary}} </h2>

        <add-form @item-added='addItem'></add-form>
    </div>
</template>

<script>
    import AddForm from "./components/AddForm.vue";
    import TodoItem from "./components/TodoItem.vue";
    import axios from "axios";
    import uniqueId from "lodash.uniqueid";

    export default {
        name: 'App',
        
        components: { AddForm, TodoItem },

        computed: {
            listSummary () {
                const numberItems = this.TodoItems.length;
                const numberDoneItems = this.TodoItems.filter((item) => item.done).length;
                return `Total: ${numberDoneItems} out of ${numberItems}`;
            }
        },

        data () { 
            return {
                TodoItems: null
            } 
        },

        methods: {
            addItem (itemLabel) {
                this.TodoItems.push({ id: uniqueId("todo-"), label: itemLabel, done: false});
            },
            updateDone (itemId) {
                const itemToUpdate = this.TodoItems.find((item) => item.id === itemId);
                itemToUpdate.done = !itemToUpdate.done;
            },
            deleteItem (itemId) {
                const itemIndex = this.TodoItems.findIndex((item) => item.id === itemId);
                this.TodoItems.splice(itemIndex, 1);
            },
            editItem (itemId, newLabel) {
                const itemToEdit = this.TodoItems.find((item) => item.id === itemId);
                itemToEdit.label = newLabel;
            },
            sendData (stuff) {
                const outData = JSON.stringify(stuff);
                document.getElementById('hiddenInput').value = outData;
            }
        },

        created () {
            // Fetch JSON data from Python Any Where //
            const url = "https://tmacedo.pythonanywhere.com/getjson/json_data.json";
                axios.get(url).then((response) => {
                    this.TodoItems = JSON.parse(response.data.message);
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
  .btn__save {
    font-size: 50%;
    color: #c82333;
    padding: 1rem 1rem 1rem 1rem;
    border: 0.2rem solid #c82333;
    cursor: pointer;
    text-transform: capitalize;
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
    max-width: 50rem;
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
    margin-bottom: 1rem;
  }
</style>
