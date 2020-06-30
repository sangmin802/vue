// Vue는 큰 규모의 웹어플리케이션이라면 Vue-cli를 통해 , create-react-app처럼 기본적인것들이 설치된 npm vue 앱도 있지만, 그렇지 않다면 CDN입력을 통해 실행시킬 수 있다.

// 1. Vue의 양방향 바인딩
new Vue({
  el : '#app', // 타겟이 되는 태그
  data : { // 양뱡향 바인딩 값들 HTML에서는 중괄호로 접근할 수 있다.
    message : '안녕하세요 Vue!'
  }
})

// 2. v-bind
//    디렉티브라고하며, Vue에서 제공하는 특수속성인 v-접두어가 붙어있고, 렌더링된 DOM에 특수한 반응형 동작을 한다.
//    HTML태그의 속성에 접근할 수 있다.
new Vue({
  el : '#app2',
  data : {
    message : `이 페이지는 ${new Date}에 로드되었습니다.`
  }
})

// 3. 조건문과 반복문
//    1) 조건문
//        Vue1처럼 텍스트뿐만 아니라, DOM구조에도 데이터를 바인딩할 수 있다. 또한, 트랜지션 효과를 적용시킬수도 있다.(이후 다룰 예정)
new Vue({
  el : '#app3',
  data : {
    seen : true // false 하면 안보임
  }
})
//    2) 반복문
//        배열의 데이터를 바인딩하여, 모두 표시할 수 있다.
new Vue({
  el : '#app4',
  data : {
    todos : [
      { text: 'JavaScript 배우기' },
      { text: 'Vue 배우기' },
      { text: '무언가 멋진 것을 만들기' }
    ]
  }
})

// 4. 사용자 입력 핸들링
//    사용자가 앱과 상호작용할 수 있게 하기 위해 v-on 디렉티브를 사용하여 Vue인스턴스에서 메소드를 호출하는 이벤트를 추가할 수 있다.
//    DOM에 직접 메소드를 추가하는것도 가능하다.
new Vue({
  el : '#app5',
  data : {
    message : '눌러보세요!',
    seen : true
  },
  methods : {
    alertMessage(){
      this.message = this.message === '눌러보세요!' ? '눌렸습니다! 되돌리세요!' : '눌러보세요!';
    }
  }
})

// 5. 양식에 대한 입력과 앱 상태를 양방향으로 바인딩하는 v-model 디렉티브를 갖고있다.
new Vue({
  el : '#app6',
  data : {
    form : {
      message : null,
    },
    message : '',
  },
  methods : {
    submit(e){
      e.preventDefault();
      this.message = this.form.message;
    }
  }
})

// 6. 컴포넌트 활용하기
//    Vue에서 컴포넌트는 미리 정의된 옵션을 가진 Vue 인스턴스입니다.
//    상세설명
//      1) todo-item 컴포넌트에 groceryList의 값들을 나눠준다.
//      2) todo-item의 태그 속성으로 값을 기재하고, 전달해준다.(React처럼)
//      3) v-bind:key는 약간 고유식별을 위해 필요한거같음(React에서 map 메소드처럼)
//      4) Vue.component의 todo-item이 받고있는 props를 배열로 정리해주고 사용한다.
Vue.component('todo-item', {
  props : ['text', 'id'],
  template : `<p>No{{id}}, {{text}}</p>`
})
new Vue({
  el : '#app7',
  data : {
    groceryList : [
      {id : 0, text : 'Vegetables'},
      {id : 1, text : 'Cheese'},
      {id : 2, text : 'Porkbelly'}
    ]
  }
})