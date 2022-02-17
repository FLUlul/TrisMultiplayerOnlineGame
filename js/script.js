

var app = new Vue(
    {
        el: "#container",
        data: {
            storeClick: [],
            click: false,
            dbData: {
                    's1_1': '',
                    's1_2': '',
                    's1_3': '',
                    's2_1': '',
                    's2_2': '',
                    's2_3': '',
                    's3_1': '',
                    's3_2': '',
                    's3_3': ''
                },
            player:'',
            stanza:'',
            playerInput:'',
            stanzaInput:'',
            winner: false,
            icon: 'fa-solid',
        },

        mounted(){

            this.toEmptyInput();
            // valore url
            const queryString = window.location.search;

            const urlParams = new URLSearchParams(queryString);
            // valore stanza
            this.stanza = urlParams.get('stanza');
            // valore player
            this.player = urlParams.get('player');
            setInterval(this.getData, 1000);
        },

        methods: {
            async clicked(coordinata) {
                // console.log('clickato' + coordinata);
                if (this.dbData.lastUser == undefined) {
                    this.click = false
                }
                if (!this.storeClick.includes(coordinata) && this.click === false && this.winner == false) {
                    this.storeClick.push(coordinata)
                    const res = await axios.get(`server.php?stanza=${this.stanza}&player=${this.player}&position=${coordinata}`)
                    .catch(e => console.error(e));
                    this.dbData = res.data;
                    if (res.data.winner) {
                        alert('partita finita ' + res.data.lastUser);
                        this.click = true;
                        this.winner = true;
                    }
                    console.log('user click',this.dbData.lastUser);
                    this.click = true;
                    // console.log(this.dbData);
                }
                console.log(this.storeClick);
            },

            getData(){
                axios.get(`server.php?stanza=${this.stanza}`)
                    .then(r => {
                        this.dbData = r.data;
                        console.log('last user',this.dbData.lastUser);
                        this.click = this.dbData.lastUser == this.player;
                        console.log('click',this.click);
                    })
                    .catch(e => console.error(e));
            },

            toEmptyInput(){
                this.stanzaInput = ' ';
                this.playerInput = ' ';

            }
        },
    }
)