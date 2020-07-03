// 클래스와 스타일 바인딩
//    데이터 바인딩은 엘리먼트의 클래스 목록과 인라인 스타일을 조작하기 위해 일반적으로 사용된다.
//    이 두 속성은 v-bind를 사용하여 처리할 수 있다.
//    표현식으로 해당 속성의 값을 문자열로 입력해주면 되는데,
//      ex) v-bind:class="문자열"
//    이 경우 귀찮고 오류가 발생하기 쉽다. 따라서 Vue는 class와 style에 v-bind를 사용할 때 특별히 향상된 기능을 제공하며 문자열 이외에 객체 또는 배열을 사용할 수 있다.

// 1. HTML 클래스 바인딩하기
//    1) 객체 구문
//       클래스를 동적으로 toggle하기 위해 v-bind:class에 객체를 전달할 수 있다.
//        (1) 인라인으로 해도 되며, 인스턴스내부에서 정해줘도 된다.
//        (2) 계산된 속성을 저장해놓는 computed도 가능하다.
new Vue({
  el : '#objClass',
  data : {
    isActive : true,
    hasError : false,
    instanceClass : {
      active : false,
      text_danger : true
    }
  },
  computed : {
    computedClass(){
      return {
        active : this.isActive,
        text_danger : this.hasError
      }
    }
  }
})

//    2) 배열 구문
//       배열을 전달하여 클래스 목록을 지정할 수 있다.
//       삼항 조건부 기능을 통해 클래스를 동적으로 제어할 수 있습니다.
//       단, 삼항 조건부가 길어지게되면 복잡해질 수 있기 때문에, 배열 내에서 객체 구문을 사용할 수 있다.
new Vue({
  el : '#arrClass',
  data : {
    acitveClass : 'active',
    errorClass : 'text_danger',
    isActive : false,
  }
})

//    3) 컴포넌트와 함께 사용하는 방법
Vue.component('my-component', {
  template : '<p class="foo bar">Hi</p>'
})
new Vue({
  el : '#componentClass',
  data : {
    isActive : true
  }
})


// 2. 인라인 스타일 바인딩
//    1) 객체구문
//       매우 직설적으로, 거의 CSS처럼 보이지만 객체입니다.
//    2) 배열구문
new Vue({
  el : '#inlineStyle',
  data : {
    activeColor : 'green',
    fontSize : 30,
    styleObj : {
      color : 'blue',
      fontSize : '20px',
    },
    styleObj2 : {
      width : '100px',
      height : '100px',
    }
  }
})