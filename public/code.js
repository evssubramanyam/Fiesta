const addButton = document.querySelector('.addButton')
var input = document.querySelector('.input')
const container = document.querySelector('.container-fluid')

class item {
	constructor(itemName) {
		this.createDiv(itemName)
	}
	createDiv(itemName) {
		/*let input1 = document.createElement('input')
		input1.value = itemName.eventname
		input1.disabled = true
		input1.classList.add('item_input1')
		input1.type = 'text'*/
		//console.log("console.log("+String(itemName.eventname+")"))
		let row1= document.createElement('div')
		row1.classList.add('row','g-0')
		var aTag = document.createElement('a');
		//aTag.setAttribute('href',"http://localhost:9999/evedisplay.html");
		aTag.setAttribute('onclick',"localStorage.setItem('event','"+String(itemName.eventname)+"');document.location.href = 'http://localhost:9999/evedisplay.html'");
		aTag.classList.add('aTag')
		let part1= document.createElement('div')
		part1.classList.add('col-2','part1')
		let part2= document.createElement('div')
		part2.classList.add('col-5')
		let part3= document.createElement('div')
		part3.classList.add('col-3')
		let part4= document.createElement('div')
		part4.classList.add('col-2','noblk','justify-content-center','align-items-center')
		
		




		let nameo= document.createElement('div')
		nameo.classList.add('nameo')
		let timeo= document.createElement('div')
		timeo.classList.add('timeo')
		let dateo= document.createElement('div')
		dateo.classList.add('dateo')
		let addresso= document.createElement('div')
		addresso.classList.add('addresso')
		let timeicon=document.createElement('img')
		timeicon.src="timeicon.png"
		timeicon.width=30
		timeicon.height=30
		timeicon.classList.add('momo')

		let calendar=document.createElement('img')
		calendar.src="calendar.png"
		calendar.width=30
		calendar.height=30

		let location=document.createElement('img')
		location.src="location.png"
		location.width=30
		location.height=30
		
		//edito.classList.add('edito','col-sm-2')
		nameo.innerHTML=itemName.eventname
		timeo.innerHTML=itemName.time
		dateo.innerHTML=itemName.date
		dateo.insertAdjacentHTML('afterbegin', '<img src="calendar.png" width="30" height="30">');
		addresso.innerHTML=itemName.city
		addresso.insertAdjacentHTML('afterbegin', '<img src="location.png" width="30" height="30">');
		let editButton = document.createElement('button')
		editButton.innerHTML = 'EDIT'
		editButton.classList.add('editButton','justify-content-center','align-items-center')


		let itemBox = document.createElement('div')
		itemBox.classList.add('item')

		let removeButton = document.createElement('button')
		removeButton.innerHTML = 'REMOVE'
		removeButton.classList.add('removeButton','justify-content-center','align-items-center')

		container.appendChild(itemBox)


		itemBox.appendChild(aTag)
		aTag.appendChild(row1)
		row1.appendChild(part1)
		row1.appendChild(part2)
		row1.appendChild(part3)
		row1.appendChild(part4)

		part1.appendChild(timeicon)
		part1.appendChild(timeo)
		part2.appendChild(nameo)
		part4.appendChild(editButton)
		part4.appendChild(removeButton)
		part3.appendChild(dateo)
		part3.appendChild(addresso)
		
		//row1.appendChild(nameo)
		//row1.appendChild(timeo)
		//row1.appendChild(edito)
		//nameo.appendChild(input1)
		//timeo.appendChild(input3)
		//edito.appendChild(editButton)



		//itemBox.appendChild(input1)
		//itemBox.appendChild(input2)
		//itemBox.appendChild(input3)
		//itemBox.appendChild(input5)
		//itemBox.appendChild(editButton)
		///itemBox.appendChild(removeButton)

		editButton.addEventListener('click', () => this.edit(input))

		removeButton.addEventListener('click', () => this.remove(itemBox, input.value))
	}

	async edit(input) {
		const newInput = prompt('Enter new msg:', input)
		input.value = newInput
		await fetch('/api/modify', {
			method: 'POST',
			body: JSON.stringify({ old: input.value, new: newInput }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	async remove(item, value) {
		container.removeChild(item)
		await fetch('/api/delete', {
			method: 'POST',
			body: JSON.stringify({ record: value }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}

async function check() {
	if (input.value != '') {
		const id1=await input.value
		const idol=localStorage.getItem('ido')
        console.log('hmpp',idol,id1)
        const result25= await fetch('/api/userevent',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idol,
				id1
            }
            )
        }).then((res) => res.json())
        if(result25.status === 'ok'){
			const huhu=result25.usid
            const result255= await fetch('/api/eventtouser',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id1,
                huhu
            }
            )
        }).then((res) => res.json())
        if(result255.status === 'ok'){
            console.log('did it',result255.usid)
        }
            console.log('wow vivek')
			localStorage.setItem('ido',result.ido)
			document.location.href = "http://localhost:9999/dashboard.html";
        }
		else{console.log('Sad Vivek?')}
		

		input.value = ''
	}
}

async function boot() {
	const idol=localStorage.getItem('ido')
	console.log(idol,"am i here")
	const res2 =await fetch('/api/get', {
		method: 'POST',
		body: JSON.stringify({ ido2:idol }),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((t) => t.json())
	
	console.log("sir",res2)
	return res2
}

	/*var res3=[]
	var reslen=res2.length
	while(reslen!=-1){
		var record2=res2[reslen]
		const res2 =await fetch('/api/getto', {
			method: 'POST',
			body: JSON.stringify({ eventid:record }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((t) => t.json())
		res3.push(res2)
		reslen--
		/*console.log(rec)
        var eventi=await evento.findById({_id:rec})
        console.log("hmm",eventi,"eventsa?")
        ohho.push(eventi)
        }
	}
	console.log(res3)
}*/
async function booty() {
	var bbo
var res3=[]
const res33=await boot().then((data) => {
     bbo=data
  })
  for (let element of bbo) { 
  const res2 =await fetch('/api/getto', {
	method: 'POST',
	body: JSON.stringify({ eventid:element }),
	headers: {
		'Content-Type': 'application/json'
	}
}).then((t) => t.json())
res3.push(res2)}
for (let element of res3){
	new item(element)
}
}
//res33.then(console.log(res33))

booty()
addButton.addEventListener('click', check)

window.addEventListener('keydown', (e) => {
	if (e == 13) {
		check()
	}
})