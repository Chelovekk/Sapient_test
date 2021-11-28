
window.onload= () => {
   

    class Payment{
        constructor(){
            this.cardDate = document.getElementById("date");
            this.cardNumber = document.getElementById("number");
            this.cardCvc = document.getElementById("cvc");
            this.cardName = document.getElementById("name");


            this.cardDateInput = document.getElementById("cardDateInput");
            this.cardNumberInput = document.getElementById("cardNumberInput");
            this.cardCvcInput = document.getElementById("cardCvcInput");
            this.cardNameInput = document.getElementById("cardNameInput");


            this.dateStore = createStore(dateReducer, "");
            this.numberStore = createStore(numberReducer, "");
            this.cvcStore = createStore(cvcReducer, "");
            this.nameStore = createStore(nameReducer, "");




            this.dateStore.subscribe(()=>{
                const dataState = this.dateStore.getState();
                // console.log(dataState)
                this.cardDate.textContent = dataState;
            })
            this.numberStore.subscribe(()=>{
                const dataState = this.numberStore.getState();
                // console.log(dataState)
                this.cardNumber.textContent = dataState;
            })
            this.cvcStore.subscribe(()=>{
                const dataState = this.cvcStore.getState();
                // console.log(dataState)
                this.cardCvc.textContent = dataState;
            })
            this.nameStore.subscribe(()=>{
                const dataState = this.nameStore.getState();
                // console.log(dataState)
                this.cardName.textContent = dataState;
            })

            this.activeTab = 0;
            this.item = document.querySelectorAll('.tab-pane');
            this.navlink = document.querySelectorAll('.nav-link');
            console.log(this.item);
            this.nextButt = document.querySelectorAll('.nextBtn');
            this.prevButt = document.querySelectorAll('.prevBtn');

            // this.tabs.forEach(el => {
            //     el.classList.add('disabled')
            // } )
            // this._addButEvent()

            this.__addCardListeners();
            this.__nextButtomListeners();
            this.__prevButtonListeners();
        }
       
        __addCardListeners(){
            this.cardDateInput.addEventListener('input', (event) => {
                // event.target.value = event.target.value.replace(new RegExp('^(?:(?:0?[3-9]|1[0-2])/19|(?:0?[1-9]|1[0-2])/2[0-8])$'),'')
                this.dateStore.dispatch(changeDate());
            })
            this.cardNameInput.addEventListener('input', (event)=>{
                this.nameStore.dispatch(changeName());
            })
            this.cardCvcInput.addEventListener('input', (event)=>{
                this.cvcStore.dispatch(changeCvc());
            })
            this.cardNumberInput.addEventListener('input', (event)=>{
                
                this.numberStore.dispatch(changeNumber());
                let firsFigure = parseInt(this.cardNumber.textContent.substr(0,1));
                console.log(firsFigure)
                if(firsFigure == 4){
                    document.getElementById("cardType").src= "https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_rev_92px_2x.png"
                }else if (firsFigure == 5){
                    document.getElementById("cardType").src= "data:image/png;base64,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"
                }else{
                    document.getElementById("cardType").src= ""

                }
            })
            document.querySelector('.phone-detail').addEventListener('input', event=>{
                event.target.value = event.target.value.replace(/\D/g, '')
                .replace(/^(\d)/, '($1')
                .replace(/^(\(\d{2})(\d)/, '$1) $2')
                .replace(/(\d{4})(\d{1,5})/, '$1-$2')
                .replace(/(-\d{5})\d+?$/, '$1');
            })
            document.querySelector('#cardNumberInput').addEventListener('input', event=>{
                event.target.value = event.target.value.replace(/\D/, '')
            })
            document.querySelector('#cardCvcInput').addEventListener('input', event=>{
                event.target.value = event.target.value.replace(/\D/, '')
            })
            document.querySelector('#cardDateInput').addEventListener('input', event=>{
                event.target.value = event.target.value.replace(/\D/g, '')
                .replace(/^(\d)/, '$1')
                .replace(/^(\d{2})(\d)/, '$1/$2')

            })
             
        }
        __nextButtomListeners(){
            this.nextButt.forEach(el=>{
                el.addEventListener('click', event=>{
                    if(el.classList.contains('order-btn')){
                        if(document.querySelector('.order-amount').value>0){
                            this.nextStep();
                        }
                    } else if(el.classList.contains('details-btn')){
                         let detailCity = document.querySelector('.city-detail')
                         let detailPhone = document.querySelector('.phone-detail')
                         let detailAddress = document.querySelector('.address-detail')
                            if(detailAddress.value.length && detailCity.value.length && detailPhone.value.length==15){
                                this.nextStep();
                            }
                    } else if(el.classList.contains('card-btn')){
                        let card = document.querySelector("#cardNumberInput");
                        let cvc = document.querySelector("#cardCvcInput");
                        let name = document.querySelector("#cardNameInput");
                        let date = document.querySelector("#cardDateInput");
                        if(card.value.length==16 && cvc.value.length==3 && name.value.length && date.value.length==5){
                            this.nextStep();
                        }
                    }

            })
            })
        }
        __prevButtonListeners(){
            this.prevButt.forEach(el=>{
                el.addEventListener('click', event=>{
                    this.item[this.activeTab].classList.remove('show', 'active')
                    this.item[this.activeTab-1].classList.add('show', 'active')
    
                    this.navlink[this.activeTab].classList.remove('active')
                    this.navlink[this.activeTab-1].classList.add('active')
                    this.activeTab-=1;
                })
            })
        }
        nextStep(){
            this.item[this.activeTab].classList.remove('show', 'active')
            this.item[this.activeTab+1].classList.add('show', 'active')
            this.navlink[this.activeTab].classList.remove('active')
            this.navlink[this.activeTab+1].classList.add('active')
            this.activeTab+=1;
        }
    }
    new Payment()
}