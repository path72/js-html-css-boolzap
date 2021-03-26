//###################################################### 
//# MAIN INSTANCE - Vue.js                             # 
//###################################################### 

var app = new Vue(
	{
		el: '#root',
		data: {
			//* PERSON INFOS *//
			// pathToImg: 'img/',
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
						},
						/////////////
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
						},						{
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
						},						{
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
						},						{
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
						////////////
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
			//* CHAT DISPLAY *//
			contactSelectedIndex: 0,
			msgInput: '',
			srcInput: '',
			//* NEW MESSAGES *//
			isWriting: false,
			replyDelay: 2000,
			replyList: [
				'Boia, deh!',
				'Il mio tesssoro!',
				'No grazie, non mangio mai a stomaco vuoto',
				'Però solo se fosse antani',
				'Fare o non fare. Non c’è provare.',
				'Stupido è chi lo stupido fa.',
				'Montalbano, sono!',
				'Stai parlando con me?',
				'Francamente me ne infischio',
				'Strade? Dove stiamo andando non c’è bisogno di strade!',
				'Io non sono cattiva. È che mi codificano così.',
				'Gli farò un’offerta che non potrà rifiutare.',
				'Metti la cera, togli la cera',
				'Sono Wolf, risolvo problemi',
				'SI - PUÒ - FAREEEEEEEE!!!',
				'Houston, abbiamo un problema',
				'Sei solo chiacchiere e distintivo!',
				'Mi piace l’odore del napalm al mattino',
				'Al mio segnale, scatenate l’inferno',
				'Hasta la vista, baby.'
			],
			//* EDIT MESSAGES *//
			msgOverIndex: -1,
			msgEditPanelIsOpen: false,
			value: '<br>'
		},
		methods: {
			//* PERSON INFOS *//
			// imageSrc(contact) {
			// 	return this.pathToImg+'avatar'+contact.avatar+'.jpg';
			// },
			//* CHAT DISPLAY *//
			chatBtn(index) {
				this.contactSelectedIndex = index;
				this.inputMsgFocus();
				this.scrollToLastMsg();
			},
			lastMsg(contact) {
				let mes = contact.messages;
				if (mes.length > 0) {
					let {text,date} = mes[mes.length-1];
					if (text.length > 30) text = text.substring(0,30)+'...';
					return {text,date};
				} else {
					return {text:'Nessun messaggio',date:''};
				}
			},
			lastReceivedMsg(contact, waiting) {
				if (waiting) {
					return contact.name+' sta scrivendo...';
				} else {
					let mes = contact.messages.filter((el) => el.status.includes('received'));
					if (mes.length > 0) {
						let date = mes[mes.length-1].date;
						return `Ultimo messaggio ricevuto il ${date.split(' ')[0]} alle ${date.split(' ')[1]}`;
					} else {
						return 'Nessun messaggio';
					}
				}
			},
			srcChat(srcInput) {
				this.contacts.forEach((co)=>{
					if (!co.name.toLowerCase().includes(srcInput.toLowerCase()))
						co.visible = false;
					else
						co.visible = true;
				});
			},
			//* NEW MESSAGES *//
			addSentMsg() {
				if (this.msgInput && this.msgInput.trim()) {
					let msg = {
						date: this.getNowDate(),
						text: this.msgInput,
						status: 'sent'
					};
					this.contacts[this.contactSelectedIndex].messages.push(msg);
					this.msgInput = '';
					this.contactAutoReplay();
					this.scrollToLastMsg();
					this.inputMsgFocus();
				}
			},
			addReceivedMsg() {
				let msg = {
					date: this.getNowDate(),
					text: this.replyList[this.getRndInteger(0,this.replyList.length-1)],
					status: 'received'
				};
				this.contacts[this.contactSelectedIndex].messages.push(msg);
				this.scrollToLastMsg();
				this.inputMsgFocus();
			},
			contactAutoReplay() {
				this.isWriting = true;
				setTimeout(()=>{
					this.isWriting = false;
					this.addReceivedMsg();
				},this.replyDelay);
			},
			addLineToMsg() {
				console.log('addLineToMsg');
				this.msgInput = `${this.msgInput}\n`;
			},
			//* EDIT MESSAGES *//
			msgEditPanelLeave() {
				this.msgEditPanelIsOpen = false; 
			},
			msgEditPanelOver() {
				this.msgEditPanelIsOpen = true;
			},
			msgDelete(message) {
				message.text = 'questo messaggio è stato cancellato';
				message.status += ' deleted';
			},
			msgAnnihilate(index) {
				this.contacts[this.contactSelectedIndex].messages.splice(index,1);
			},
			msgInfos(message) {
				console.log('che voi sape\'?');
				console.log(message);
			},
			//* OTHER STUFF *//
			scrollToLastMsg() {
				this.$nextTick(() => {
					let msgList = document.getElementsByClassName('msg_row');
					msgList[msgList.length-1].scrollIntoView();
				});
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
			console.log('---- Vue created ----');
			console.log(this);
		},
		mounted: function() {
			console.log('---- Vue mounted ----');
			this.inputMsgFocus();
			this.scrollToLastMsg();
		},
		updated: function() {
			// console.log('updated');
		},
		computed: {
			selectedContactUpdate() {
				return this.lastReceivedMsg(this.contacts[this.contactSelectedIndex],this.isWriting);
			}
		},
		components : {
			'person-display': {
				// basic prop declaring  
				props: ['person','update'],
				// validate type declaring
				// props: {
				// 	person: Object,
				// 	update: String,
				// },
				data: function() { // isolamento dello scope dei data
					return {
					}
				},
				template: `
				<div class="component flex-row">
					<div class="avatar_img">
						<img :src="'img/avatar'+person.avatar+'.jpg'" alt="">
					</div>
					<div class="avatar_name flex-col-cv">
						<div class="txt_1">{{person.name}}</div>
						<div class="txt_2">{{update}}</div>
					</div>
				</div>
				`
			}
		}
	}
);
// Vue.config.devtools = true;
