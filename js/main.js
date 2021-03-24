//###################################################### 
//# DYNAMICS - Vue.js                                  # 
//###################################################### 

Vue.component('usrDisplay1', {
	/**
	 * passare
	 * src immagine, qui: userImageSrc
	 * nome avatar,  qui: user.name
	 * 
	 */
	template: `
	<div class="component flex-row">
		<div class="avatar_img">
			<img :src="userImageSrc" alt="">
		</div>
		<div class="avatar_name flex-row-cv">
			<div class="txt_1">{{user.name}}</div>
		</div>
	</div>
	`
});
Vue.component('usrDisplay2', {
	/**
	 * passare
	 * src immagine, qui: contactImageSrc(index)
	 * nome avatar,  qui: contact.name
	 * 
	 */
	 template: `
	<div class="component flex-row">
		<div class="avatar_img">
			<img :src="contactImageSrc(index)" alt="">
		</div>
		<div class="avatar_name flex-row-cv">
			<div class="txt_1">{{contact.name}}</div>
		</div>
	</div>
	`
});

var app = new Vue(
	{
		el: '#root',
		data: {
			pathToImg: 'img/',
			user: {
				name: 'Dovahkiin',
				avatar: '_io',
			},
			contacts: [
				{	name: 'Michele',
					avatar: '_1',
					visible: true,
					messages: [
						{
							date: '10/01/2020 15:30:55',
							text: 'Hai portato a spasso il cane?',
							status: 'sent'
						},
						{
							date: '10/01/2020 15:50:00',
							text: 'Ricordati di dargli da mangiare',
							status: 'sent'
						},
						{
							date: '10/01/2020 16:15:22',
							text: 'Tutto fatto!',
							status: 'received'
						}
					],
				},
				{	name: 'Fabio',
					avatar: '_2',
					visible: true,
					messages: [
						{
							date: '20/03/2020 16:30:00',
							text: 'Ciao come stai?',
							status: 'sent'
						},
						{
							date: '20/03/2020 16:30:55',
							text: 'Bene grazie! Stasera ci vediamo?',
							status: 'received'
						},
						{
							date: '20/03/2020 16:35:00',
							text: 'Mi piacerebbe ma devo andare a fare la spesa.',
							status: 'sent'
						}
					],
				},
				{	name: 'Samuele',
					avatar: '_3',
					visible: true,
					messages: [
						{
							date: '28/03/2020 10:10:40',
							text: 'La Marianna va in campagna',
							status: 'received'
						},
						{
							date: '28/03/2020 10:20:10',
							text: 'Sicuro di non aver sbagliato chat?',
							status: 'sent'
						},
						{
							date: '28/03/2020 16:15:22',
							text: 'Ah scusa!',
							status: 'received'
						}
					],
				},
				{	name: 'Luisa',
					avatar: '_4',
					visible: true,
					messages: [
						{
							date: '10/01/2020 15:30:55',
							text: 'Lo sai che ha aperto una nuova pizzeria?',
							status: 'sent'
						},
						{
							date: '10/01/2020 15:50:00',
							text: 'Si, ma preferirei andare al cinema',
							status: 'received'
						}
					],
				},
			],
			contactSelectedIndex: 0,
			msgInput: '',
			replyList: [
				'Boia, deh!',
				'Il mio tesssoro!',
				'Però solo se fosse antani',
				'Fare o non fare. Non c’è provare.',
				'Stupido è chi lo stupido fa.',
				'Montalbano, sono!',
				'Stai parlando con me?',
				'Strade? Dove stiamo andando non c’è bisogno di strade!',
				'Io non sono cattiva. È che mi codificano così.',
				'Gli farò un’offerta che non potrà rifiutare.',
				'Metti la cera, togli la cera.',
				'Sono Wolf, risolvo problemi.',
				'Sei solo chiacchiere e distintivo!',
				'Mi piace l’odore del napalm al mattino.',
				'Al mio segnale, scatenate l’inferno.',
				'Hasta la vista, baby.'
			]
		},
		methods: {
			contactImageSrc(index) {
				return this.pathToImg+'avatar'+this.contacts[index].avatar+'.jpg';
			},
			chatBtn(index) {
				this.contactSelectedIndex = index;
				this.inputMsgFocus();
			},
			addSentMsg() {
				if (this.msgInput && this.msgInput.trim()) {
					let msg = {
						date: this.getNowDate(),
						text: this.msgInput,
						status: 'sent'
					};
					this.contacts[this.contactSelectedIndex].messages.push(msg);
					this.msgInput = '';
					this.inputMsgFocus();
					this.contactAutoReplay();
				}
			},
			addReceivedMsg() {
				let n = this.getRndInteger(0,this.replyList.length-1);
				console.log(n);
				let msg = {
					date: this.getNowDate(),
					text: this.replyList[this.getRndInteger(0,this.replyList.length-1)],
					status: 'received'
				};
				this.contacts[this.contactSelectedIndex].messages.push(msg);
				this.inputMsgFocus();
			},
			contactAutoReplay() {
				setTimeout(()=>{
					this.addReceivedMsg();
				},1000);
			},
			getNowDate() {
				let n = dayjs();
				return n.format('DD/MM/YYYY HH:mm:ss');
			},
			inputMsgFocus() {
				this.$refs.msgInputField.focus();
			},
			getRndInteger(a,b) {
				return Math.floor(Math.random()*(b-a+1)+a);
			}
		},
		created: function() {
			console.log(this);
			console.log('---- Vue created ----');
		},
		mounted: function() {
			this.inputMsgFocus();
		},
		computed: {
			userImageSrc() {
				return this.pathToImg+'avatar'+this.user.avatar+'.jpg';
			},
			contactLastMsg() {
				let receivedMsgList = this.contacts[this.contactSelectedIndex].messages.filter((el) => el.status == 'received');
				let date = receivedMsgList[receivedMsgList.length-1].date;
				return { day:date.split(' ')[0], hour:date.split(' ')[1] };
			}
		}
	}
);
// Vue.config.devtools = true;

//###################################################### 
//# DYNAMICS - jQuery                                  # 
//###################################################### 

// $(function() {
// // ********************* doc ready start ***


// // *********************** doc ready end ***
// });

//###################################################### 
//# FUNCTIONS                                          # 
//###################################################### 


