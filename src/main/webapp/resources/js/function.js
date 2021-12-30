function getDom(arr){
	
	let dom = '<table border="1" cellpadding="7" cellspacing="0">'
		dom += '<tr>'
		dom += '<th>gubun</th>'
		dom += '<th>deathCnt</th>'
		dom += '<th>incDec</th>'
		dom += '<th>localOccCnt</th>'
		dom += '<th>overFlowCnt</th>'
		dom += '<th>qurRate</th>'
		dom += '</tr>'
			
		arr.forEach(e => {
			dom + '<tr>'
			dom += '<td>' + e.gubun + '</td>'
			dom += '<td>' + e.deathCnt + '</td>'
			dom += '<td>' + e.incDec + '</td>'
			dom += '<td>' + e.localOccCnt + '</td>'
			dom += '<td>' + e.overFlowCnt + '</td>'
			dom += '<td>' + e.qurRate + '</td>'
			dom += '</tr>'
			
		})
		dom += '</table>'
			
	return dom
}


// CORS 이슈 해결(공공데이터포털에서 허용해줌)
function getCovidDataJavascript(event){
//		const url = cpath + '/covid'
	const url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=q6WAnLS1b6vUa9VoLCKmB14TY6kJ3AotCfHj10BgvLRuyQTk6nnlrOruwjHTWL9K8XZ%2B8L6Ic26%2BDJdRsSzOTw%3D%3D&pageNo=1&numOfRows=10&startCreateDt=20211229&endCreateDt=20211229'
	const opt = {
		method : 'get'	
	}
	fetch(url, opt)
	.then(resp => resp.text())
	.then(text => {
		console.log(text)
//			const b = xmlToJson.parse(json)
		const xml2json = new XMLtoJSON()
		
		const ob = xml2json.fromStr(text)
		
		console.log(ob.response.body.items.item)
		
		const arr = ob.response.body.items.item.map(v => {
			return {
				gubun 		: v.gubun['#text'],				// 구분
				deathCnt 	: v.deathCnt['#text'], 			// 누적 사망자 수
				incDec		: v.incDec['#text'],			// 일일 감염자 수
				localOccCnt : v.localOccCnt['#text'],		// 지역 감염자 수
				overFlowCnt : v.overFlowCnt['#text'], 		// 유입 감염자 수
				qurRate 	: v.qurRate['#text']			// 10만명 당 감염자 수 비율
			}
		})
		
		const tmp = arr.splice(0,1)		// gubun : 검역 데이터만 따로 가져오기
		const sum = arr.splice(17,1)	// gubun : 합계 데이터만 따로 가져오기
		console.log(tmp)
		
		arr.sort((a,b) => {
			return +a.incDec > +b.incDec ? 1 : -1
		})
		
		// push는 배열의 맨 마지막에 요소추가
		arr.push(tmp[0])		
		arr.push(sum[0])
		
		root.innerHTML += getDom(arr)
				
//			const arr1 = ob.response.body.items.item
//			console.log(arr1)

//			
//			arr1.forEach(dto => {
//				const b = dto.createDt
//				for(key in dto.gubun){
//					let dom = ''
//					const c = dto.gubun[key]
//					dom += '<div>' + dto.gubun[key] + '</div>'
//					console.log(c)
//					root.innerHTML += dom
//				}
			
//			})
	
		
//			console.log('b',b)
	})
//		.catch(error => console.log({error : error}))
}




// 자바 스프링 서버로 데이터 받아오기
function getCovidDataJava(event){
	const url = cpath + '/covid'
	const opt = {
			method : 'get'
	}
	fetch(url, opt)
	.then(resp => resp.json())
	.then(json => {
		console.log(json)
		
		const arr = json.response.body.items.item.map(v => {
			return {
				gubun 		: v.gubun,				// 구분
				deathCnt 	: v.deathCnt, 			// 누적 사망자 수
				incDec		: v.incDec,				// 일일 감염자 수
				localOccCnt : v.localOccCnt,		// 지역 감염자 수
				overFlowCnt : v.overFlowCnt, 		// 유입 감염자 수
				qurRate 	: v.qurRate				// 10만명 당 감염자 수 비율
			}
		})
		
		const tmp = arr.splice(0,1)		// gubun : 검역 데이터만 따로 가져오기
		const sum = arr.splice(17,1)	// gubun : 합계 데이터만 따로 가져오기
		console.log(tmp)
		
		arr.sort((a,b) => {
			return +a.incDec < +b.incDec ? 1 : -1
		})
		
		// push는 배열의 맨 마지막에 요소추가
		arr.push(tmp[0])		
		arr.push(sum[0])
		
		root.innerHTML += getDom(arr)
				
//			const arr1 = ob.response.body.items.item
//			console.log(arr1)

//			
//			arr1.forEach(dto => {
//				const b = dto.createDt
//				for(key in dto.gubun){
//					let dom = ''
//					const c = dto.gubun[key]
//					dom += '<div>' + dto.gubun[key] + '</div>'
//					console.log(c)
//					root.innerHTML += dom
//				}
			
//			})
	
		
//			console.log('b',b)
	
	})
}