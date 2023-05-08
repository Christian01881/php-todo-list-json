const { createApp } = Vue;

createApp({
    data(){
        return{
            todo: [],
            newItem: '',
        }
    },
    methods: {
        //Creo un metodo per aggiungere elementi alla lista
        Add(){
            const data = {
                newItem: this.newItem,
            }
            axios.post('php/index.php',data,{
                headers: {'Content-Type' : 'multipart/form-data'}
            })
            .then((response) => {
                this.todo = response.data;
            })
            this.newItem = '';
        },

        //Creo un metodo per il toggle del check
        check(index){
            const data = {
                check: index
            }
            axios.post('php/index.php',data,{
                headers: {'Content-Type' : 'multipart/form-data'}
            })
            .then((response) => {
                this.todo = response.data;
            })
        },

        //Creo un metodo per cancellare un elemento dalla lista
        deleteTodo(index){
            const data = {
                delete: index
            }
            axios.post("php/index.php", data, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((response) => {
                this.todo = response.data;
              });
        },
    },
    created() {
        // Chiamata originale all'API
        axios.get('php/index.php')
        .then((response) => {
            this.todo = response.data;
        })
    },
}).mount('#app')