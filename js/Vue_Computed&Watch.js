
// 1. Computed
//    템플이나 DOM 내에 표현식을 넣으면 편리하긴 합니다.
//      ex) <div>{{ message.split('').reverse().join('') }}</div>
//    하지만, 너무 많은 연산을 템플릿이나 DOM 내에서 하면 코드가 비대해지고 유지보수가 어렵습니다.
//    복잡한 로직이라면 반드시 Computed 속성을 사용해야한다.
//    메소드로 계산된 data값을 즉시바인딩한다고 생각하자.
//    computed에게 data의 값은 필수적

//    물론, computed나 methods나 출력되는 결과는 동일하다. 하지만 차이점
//    computed 
//      1) computed메소드로 연결되있는 data의 값이 변하지 않는 한, 해당 메소드는 절대 실행되지 않는다.
//          -> 즉, DOM이나 템플릿에서 {{reversedMessage}}를 한번을 쓰든 백번을 쓰든, message가 달라지지 않는다면 한번만 실행되고, 그 값을 저장해두었다가(캐싱) 돌려줌.
//    methods
//      1) Dom이나 템플릿에서 {{reversedMessage()}}를 쓸 때마다 호출됨

//    결론 : 사용자의 요청인 이벤트와 바인딩된 메소드가 필요한 경우, methods 사용. 그렇지 않고, 이미 가지고있는 data를 기반으로 재가공이필요한 메소드일 경우 computed사용

//    computed의 setter함수
//    computed는 기본적으로 getter함수만 있지만, 필요한 경우 setter함수를 만들 수 있다.
//    쓸 일은.. 글쎄...?
new Vue({
  el : '#Computed',
  data : {
    message : '안녕하세요'
  },
  computed : {
    reversedMessage(){
      return this.message.split('').reverse().join('');
    }
  },
  // methods : {
  //   reversedMessage(){
  //     return this.message.split('').reverse().join('');
  //   }    
  // }
})

// 2. watch
//    Vue에서 가장 기본적인 속성으로 데이터의 변경에 반응하는 일반적인 방법이다. 대부분의 경우 computed가 더 적합하지만, 사용자가 만든 감시자가 필요한 경우가 있다.
new Vue({
  el : '#Watch',
  data : {
    question : '',
    answer : '질문을 하기 전까지는 대답할 수 없습니다.'
  },
  watch : {
    question(){ // data의 값과 같은 명의 메소드로 설정하여 해당 데이터의 값이 변결될 때마다 실행
      this.answer = '입력을 기다리는중...'
      this.getAnswer();
    }
  },
  methods : {
    getAnswer : _.debounce(
      function(){
        if(!this.question.includes('?')){
          this.answer = '질문에는 일반적으로 물음표가 포함됩니다.';
          return
        }
        this.answer = '생각중...'
        fetch('https://yesno.wtf/api')
        .then(res => res.json())
        .then(data => {
          this.answer = _.capitalize(data.answer)
        })
        .catch((err) => {
          this.answer = err;
        })
      },
      500
    )
  }
})

// 3. computed vs watch vs methods
//    1) computed : 특정 data의 값을 기반으로 작동하는 단순 표현식?
//                  data가 결과값의 초기값을 가질 필요 없이, 메소드명 즉시 바인딩 가능
//    2) watch : 특정 data의 값을 감시하고있다가, 변화가 있을 때 해당 data값이 속성명인 함수를 콜백함수로 실행시킨다.(data에 꼭 결과값의 초기값을 가지고 있어야 함. 기본적인 Vue의 특성)
//       해당 콜백함수의 첫번째인자는 바뀐data값 두번째인자는 바뀌기 전 data 값이다.
//                methods랑 비슷한데, 사용자의 요청이 아닌 데이터값이 변함에 따라 작동
//    3) methods : 사용자의 이벤트가 호출될 때만 실행되는 메소드들

// 4. computed vs watch
new Vue({
  el : '#Computed_vs_Watch',
  data : {
    // fullName : '',
    firstName : '',
    lastName : ''
  },
  created(){
    setTimeout(() => {
      this.firstName = '박',
      this.lastName = '상민'
    }, 1000)
  },
  // watch : {
  //   firstName(newVal, oldVal){
  //     this.fullName = newVal + this.lastName;
  //   },
  //   lastName(newVal, oldVal){
  //     this.fullName = this.firstName + newVal;
  //   },
  // },
  computed : {
    fullName(){
      return this.firstName+this.lastName;
    }
  }
})