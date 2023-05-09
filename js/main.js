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
            axios.post('server.php',data,{
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
            axios.post('server.php',data,{
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
            axios.post("server.php", data, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((response) => {
                this.todo = response.data;
              });
        },
    },
    created() {
        // Chiamata originale all'API
        axios.get('server.php')
        .then((response) => {
            this.todo = response.data;
        })
        console.log(response.data);
    },
}).mount('#app')