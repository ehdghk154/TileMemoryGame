let tiles; // 정답 타일 개수
let alltiles; // 모든 타일
let score = 0; // 점수
let fail; // 오답 제한
let success; // 정답 개수
let ansId = []; // 정답 타일 ID

// 타일 게임 보드판 생성
function createMatrix(n) {
	let board = document.getElementById("board"); // 게임 보드판
	for (let i = 0; i < n; i++){
		let t = document.createElement('article'); // article 태그 == tile 생성 
		t.setAttribute("id", i); // id 0~n-1 설정
		t.setAttribute("onClick", "tileE(this.id)"); // 타일별 클릭시 이벤트 설정
		t.setAttribute("class", "tile"); // 스타일 tile로 설정
        board.appendChild(t); // board에 tile 추가
	}
}

//Start 버튼 클릭시 타일 보드 생성
function Start() {
	let tilesNum; // 총 타일 수
	let board = document.getElementById("board"); // 게임 보드판
	let sboard = document.getElementById("sub-board"); // 서브 보드판(메뉴판)
	let select = document.getElementById("select"); // 처음 화면(난이도 선택 화면)
	let play = document.getElementById("play"); // PLAY 버튼
	let Continue = document.getElementById("continue"); // CONTINUE 버튼
	let tileset = document.getElementsByName("tileset"); // 라디오 버튼들
	let Count = document.getElementById("count"); // 남은 타일 개수
	for(let i = 0; i<tileset.length; i++){ // 라디오 버튼 개수 만큼 반복
    	if(tileset[i].checked == true){ // 라디오버튼이 체크 상태면
            tilesNum = tileset[i].value; // tilesNum에 라디오버튼 value 값 넣기
			alltiles = tilesNum;
        }
    }
	//if(tilesNum == 9){
	//	tiles = 5;
	//}
	switch(tilesNum){ // 총 타일 개수가
		case '9': // 9개면 정답 타일 수 5개
			tiles = 5;
			break;
		case '16': // 16개면 정답 타일 수 8개
			tiles = 8;
			break;
		case '25': // 25개면 정답 타일 수 13개
			tiles = 13;
			break;
	}
	Count.innerHTML = "tiles : " + tiles; // 정답 타일 수 출력
	fail = 2; // 2번 틀리면 실패
	success = tiles; // tiles 개수 만큼 맞추면 성공
	ansId = null; // 더이상 클릭해도 변화x
	createMatrix(tilesNum); //타일 생성
	let boardsize = Math.sqrt(tilesNum) * 90; // 타일 개수 별 보드판 크기 설정
	board.style.width = boardsize + "px"; // 가로 길이
	board.style.height = boardsize + "px"; // 세로 길이
	board.style.display = "block"; // 보드판 보이기
	sboard.style.width = boardsize + "px"; // 서브보드판 가로 길이
	sboard.style.display = "block"; // 서브보드판 보이기
	select.style.display = "none"; // 난이도 선택 화면 숨기기
	play.style.display = "block"; //  PLAY 버튼 보이기
	Continue.style.display = "none"; // CONTINUE 버튼 숨기기
}

//타일 클릭 함수
function tileE(clicked_id) {
	let clickedTile = document.getElementById(clicked_id); // 클릭한 타일 id 불러옴
	let Continue = document.getElementById("continue");
	let total = document.getElementById("score");
	let Count = document.getElementById("count");
	let i;
	for (i = 0; i < ansId.length; i++){ // 정답 타일 개수만큼 반복
		if (clicked_id != ansId[i]){}
		else { // 클릭한 타일이 정답 타일일 경우
			if (clickedTile.getAttribute("class") == "anstile"){ break; } // 중복 클릭 방지
			clickedTile.setAttribute("class", "anstile") // 타일색 초록색으로 변경
			success--; // 남은 타일 수 감소
			Count.innerHTML = "tiles : " + success; // 남은 타일 수 출력
			score += 30; // 점수 30점 추가
			total.innerHTML = "SCORE : " + score; // 추가된 점수 입력
			break;
		}
	}
	
	if (i >= ansId.length && clickedTile.getAttribute("class") != "wrongtile"){ // 클릭한 타일이 정답 타일이 아닐경우 & 중복 클릭 방지
		clickedTile.setAttribute("class", "wrongtile"); // 타일색 빨간색으로 변경
		fail--; // 남은 오답 타일 수 감소
		score -= 100; // 점수 100점 감소
		total.innerHTML = "SCORE : " + score; // 감소된 점수 입력
	}
	if (success == 0){ // 성공시 실행
		ansId = null; // 더이상 클릭해도 변화x
		Continue.style.display = "block"; // CONTINUE 버튼 출력
		total.innerHTML = "Total Score : " + score + " Success!!"; // 성공시 출력될 메시지
	}else if (fail == 0){ // 실패시 실행
		ansId = null; // 더이상 클릭해도 변화x
		Continue.style.display = "block"; // CONTINUE 버튼 출력
		total.innerHTML = "Total Score : " + score + " Fail..."; // 실패시 출력될 메시지
	}
}

//난수 생성 함수
function RandomNumber(t){
    
    return Math.floor(Math.random() * t); // 0부터 t-1 까지 랜덤
}

//랜덤한 타일 Id 선택
function getTileID() {
	let selectID = []; // 랜덤한 타일 Id 저장
	for(let i = 0; i < tiles; i++) {
		let num = RandomNumber(alltiles);
		if(selectID.indexOf(num) > -1){
			i--; // num에 해당하는 숫자가 이미 있는 경우 돌아가서 다른 난수 재출력
		}else {
			selectID[i] = num; // num에 해당하는 숫자가 없는 경우 추가
		}
	}
	return selectID; // 저장한 랜덤 타일 리턴
}

//정답 타일 보이기
function printTile(t) {
	for(let i = 0; i < t.length; i++){ // 정답 타일 수 만큼 반복
		let answer = document.getElementById(t[i]); // t에 해당하는 id 얻어옴
		answer.setAttribute("class", "tile2"); // 타일의 스타일을 'tile2'로 출력
	}
}

//타일 숨기기
function hideTile(t) {
	for(let i = 0; i < t.length; i++){ // 정답 타일 수 만큼 반복
		let answer = document.getElementById(t[i]); // 정답 타일의 id 가져오기
		answer.setAttribute("class", "tile"); // 처음 상태의 타일로 설정
	}
}
//플레이 버튼
function Play() {
	let delay = [];// 출력 중 클릭 못하게 하기 위한 delay배열
	let play = document.getElementById("play");
	let total = document.getElementById("score");
	play.style.display = "none"; // PLAY 버튼 없애기
	total.innerHTML = "SCORE : " + score; // 점수 텍스트 설정
	total.style.display = "block"; // 점수 출력
	delay = getTileID(); // delay에 랜덤 타일들 저장
	setTimeout(function(){printTile(delay)}, 500); // 시작 전 0.5초 딜레이
	setTimeout(function(){hideTile(delay); ansId = delay;}, 1500); // 앞의 setTimeout과 1초 차이로 설정(1초동안 보여짐),
																   // delay배열 값을 ansId로 저장
}

// 재시작 버튼
function Restart() {
	let total = document.getElementById("score");
	let Continue = document.getElementById("continue");
	let Count = document.getElementById("count");
	Continue.style.display = "none"; // CONTINUE 없애기
	fail = 2; // 실패 횟수 초기화
	success = tiles; // 성공 횟수 초기화
	total.innerHTML = "SCORE : " + score; // 점수 텍스트 설정
	Count.innerHTML = "tiles : " + success; // 남은 타일 수 초기화
	for(let i = 0; i < alltiles; i++){ // 모든 타일 회색으로 초기화
		let answer = document.getElementById(i);
		answer.setAttribute("class", "tile"); // 타일 초기화
	}
	Play(); // 시작
}

//처음 화면으로 돌아가기 버튼
function Back() {
	let total = document.getElementById("score");
	let board = document.getElementById("board");
	let sboard = document.getElementById("sub-board");
	let select = document.getElementById("select");
	let play = document.getElementById("play");
	let Continue = document.getElementById("continue");
	if(play.style.display == "none" && Continue.style.display == "none") {} // 시작하면 끝날때까지 처음으로 못감
	else {
		for (let i = 0; i < alltiles; i++) {
			let t = document.getElementById(i); // 타일 id 불러옴
			board.removeChild(t); // 보드판에서 타일 제거
		}
		ansId = null; // 더이상 클릭해도 변화x
		board.style.display = "none"; // 화면에서 숨기기
		sboard.style.display = "none";
		total.style.display = "none";
		select.style.display = "block"; // 화면에 보이기
	}
}