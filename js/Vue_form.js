// v-model 디렉티브를 사용하여 폼 input과 textarea 엘리먼트에 양방향 데이터 바인딩을 생성할 수 있습니다.
// v-model은 내부적으로 서로 다른 속성을 사용하고, 서로 다른 입력요소에 대해 다른 이벤트를 전송합니다.
//    1) text, textarea태그는 value 속성과 input 이벤트를 사용합니다.
//    2) checkbox, radio는 checked속성과 change이벤트를 사용합니다.
//    3) select는 value속성과 change이벤트를 사용합니다.

// 1. 문자열
new Vue({
  el : '#text',
  data : {
    text : null
  }
})
// 2. 여러줄을 가진 문장
new Vue({
  el : '#textarea',
  data : {
    textarea : null
  }
})
// 3. 체크박스
//    1) 하나의 체크박스는 단일 boolean값을 가집니다.
//    2) 여러개의 체크박스는 같은 배열을 바인딩 할 수 있습니다.
new Vue({
  el : '#checkbox',
  data : {
    checked : true,
    checkedNames : []
  }
})
// 4. 라디오
new Vue({
  el : '#radio',
  data : {
    FPS : null
  }
})
// 5. 셀렉트
//    1) 단일 셀렉트, 다중 셀렉트
new Vue({
  el : '#select',
  data : {
    selected : 'Please select one',
    options : ['Chicken', 'Pizze', 'Hamburger'],
    selectedArr : []
  }
})

// 6. 값 바인딩하기
//    라디오, 체크박스 및 셀렉트 옵션의 경우 v-model 바인딩 값은 보통 문자열 (체크박스는 boolean. 문자열로 해주고싶으면 value값 지정 혹은 true false일때의 값을 별도로 지정할 수 있다.) 입니다.
new Vue({
  el : '#binding',
  data : {
    radioValue : null,
    boolean : null,
    selected : null,
    A : '에이',
    upperLower : {upper : 'ABC', lower : 'abc'}
  }
})

// 7. 수식어
//    1) .lazy
//       기본적으로 v-model은 각 입력 이벤트 후 데이터를 동기화 합니다. .lazy수식어를 사용하여 change 이벤트 이후(입력이 종료되고, 다른 이벤트 실행시)에 동기화 할 수 있습니다.
//    2) .number
//       문자열로 들어오기전 숫자열로 바꿔준다.
//    3) .trim
//       자동으로 앞 뒤 공백을 지워준다
new Vue({
  el : '#sub',
  data : {
    msg : null,
    num : null,
  },
  methods : {
    change(){
      console.log(`입력완료 ${this.msg}`)
    }
  }
})