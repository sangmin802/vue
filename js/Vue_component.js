// 컴포넌트?
//  기존 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화하는 데 도움이 된다. 경우에 따라 특별한 is 속성으로 확장된 원시 HTML 엘리먼트로 나타낼 수 있다.
//   Vue 컴포넌트는 Vue 인스턴스 이기도 한다. 그러므로 대부분의 옵션을 사용할 수 있다.

// 1. 컴포넌트 사용하기
//    컴포넌트 명으로 지정한 태그에 template에 지정한 태그로 교체됨
//    1) 전역등록
//       모든 el(인스턴스)에서 사용할 수 있음
Vue.component('my-component', {
  template : `
    <div>사용자 정의 전역 component 입니다</div>
  `
})
new Vue({
  el : '#component1',
}) 
//    2) 지역등록
//       해당 el(인스턴스) 하위에서만 사용할 수 있음
const component2 = {
  template : `
    <div>사용자 정의 지역 component 입니다</div>
  `
}
new Vue({
  el : '#component2',
  components : {
    'my-component' : component2
  }
}) 

//    3) DOM 템플릿 구문 분석 경고를 위한 is
//       DOM을 템플릿으로 사용할 때 ul, ol, table, select와 같은 일부 엘리먼트들은 자식 엘리먼트를 갖는데 제한사항이 있다.
//       해당 태그에 기존방식처럼 template으로 지정한 태그를 넣게되면, 렌더링시 에러를 발생시킨다. 이를 해결하기위해 is 특수속성을 사용한다.
const component3 = {
  template : `<li>특수속성 is</li>`
}
new Vue({
  el : '#component3', // ul태그
  components : {
    'my-component' : component3
  }
}) 

//    4-1) data는 반드시 함수여야 한다.
//       인스턴스와 같은 함수가 아닌 값을 적용시키면 에러가 발생한다.
const component4 = {
  template : `<div>{{message}}</div>`,
  data : {
    message : '템플릿의 데이터 값들은 항상 함수여야 한다.' // 에러가 나옴 에러 유지하겠음
  }
}
new Vue({
  el : '#component4',
  components : {
    'my-component' : component4
  }
}) 
//    4-2) 함수식으로 해야 정상작동
//         해당 낱개의 template이 사용하게 될 data 객체를 반환하도록 함
const component5 = {
  template : `<button @click="counter++">{{counter}}</button>`,
  data(){
    return {
      counter : 0
    }
  }
}
new Vue({
  el : '#component5',
  components : {
    'my-component' : component5
  },
}) 

//    5) 컴포넌트 작성
//       컴포넌트는 부모-자식 관계에서 가장 일반적으로 함께 사용하기 위한 것이며, 필연적으로 서로 의사소통이 필요하다.
//       React처럼 부모는 자식에게 props값들을 보내고, 자식은 그 props중의 이벤트를 활용해서 부모에게 알린다.

//  2) Props
new Vue({
  el : '#props1',
  data : {
    message : 'Props 전달!',
    obj : {
      text : '객체전달!',
      boolean : false
    }
  },
  components : {
    props : {
      props : ['message', 'obj'],
      template : `<div>{{message}},{{obj.text}},{{obj.boolean}}</div>`
    }
  }
})
//     1) camelCase vs kebab-case
//        HTML 속성은 대소문자를 구분하지 않기 때문에, 대문자가아닌 -를 사용하자.

//     2) 만약 초기에 보내진 props의 값을 수정하고 싶다면?
//        data 메소드를 통해 자신만의 data 값으로 만들고, 그것을 수정/적용
//        단, 객체나 배열을 변경할 경우, 참조라는 특성때문에 부모의 것도 바뀔 수 있으니 복사해서 사용하자
new Vue({
  el : '#props2',
  data : {
    num : 30
  },
  components : {
    props : {
      props : ['num'],
      template : `<button @click="math" :class="{tomato : childNum===15}">{{childNum}}</button>`,
      data(){
        return {
          childNum : this.num
        }
      },
      methods : {
        math(){
          this.childNum = this.childNum/2;
        }
      }
    }
  }
})

//     3) prop 검증
//        컴포넌트가 받는 prop에 대한 요구사항을 지정할 수 있다. 요구사항이 충족되지 않을경우, 경고를 보낸다. 근데 출력은 되네..?
//        props속성을 문자열로 구성된 배열이 아닌 유효성 검사 요구사항이 있는 객체를 사용해야한다.
//        props 검증은, 컴포넌트 인스턴스가 생성되기 전에 실행되므로, methods, computed와 같은 속성을 사용할 수 없다.
new Vue({
  el : '#props3',
  data : {
    propA : 30,
    propB : '문자열과 숫자열 가능',
    propC : '문자열이여야하고 꼭 필요',
    propD : 80,
    propE : {id : 1, text : '객체이고, 기본값은 메소드로 반환'},
    propF : 8
  },
  components : {
    props : {
      props : {
        // 기본단일타입
        propa : Number,
        // 여러개 가능한 타입
        propb : [String, Number],
        // 문자열이여야하며 꼭 필요함
        propc : {
          type : String,
          required : true
        },
        // 숫자타입이여아하며 기본값이 있음
        propd : {
          type : Number,
          default : 100
        },
        // 객체타입이며, 기본객체는 메소드를 통해 반환됨
        prope : {
          type : Object,
          default(){
            return {message : 'default'}
          }
        },
        // 사용자 정의 검사기능
        propf : {
          validator(value){
            return value > 10
          }
        }
      },
      template : `
        <div>{{propa}}, {{propb}}, {{propc}}, {{propd}}, {{prope}}, {{propf}}</div>
      `
    },
  }
});

// 3. Props가 아닌 속성
//    1) 존재하는 속성 교체/병합
//       만일, template이 type="date"라는 속성을 갖고있는데, 부모 태그에게서 type="large"를 전달받게된다면 type의 값은 large로 바뀔것이다. 그럼 에러가 생길것!(다행이, css는 두개 합쳐짐)
//       그렇다면 문제가 발생했을 때, 부모에게는 어떻게 알릴까?

//    2) v-on을 이용한 사용자 지정 이벤트
//       $on(eventName)을 사용하여 이벤트를 감지하세요
//       $emit(eventName)을 사용하여 이벤트를 트리거하세요
//       부모컴포넌트는 자식컴포넌트의 템플릿에서 직접 v-on을 사용하여 자식컴포넌트에서 실행된 이벤트를 감지할 수 있습니다.
//       $on은 자식에서 실행된 이벤트를 감지하지 못하며, v-on을 템플릿에 반드시 지정해줘야 한다.

//       간단 설명
//       1. 컴포넌트는 @이벤트명="실행되는 메소드" 를 통해 커스텀이벤트를 즉시제작함. 해당 커스텀이벤트는 부모의 메소드를 호출함
//       2. 자식컴포넌트의 template에서 이벤트가 실행될 때 마다, this.$emit으로 컴포넌트에 지정된 커스텀이벤트를 실행시킴(해당 커스텀이벤트는 부모의 메소드를 호출하는것)(dispatchEvent 트리거 같은 역할)
//       3. 고맙게도. $emit의 두번째 이후 인자로, 자식 컴포넌트의 data값을 매개변수로 보낼수 있으며, 커스텀 이벤트로 연결된 부모의 메소드 인자로 받는다.

//    2) 사용자 지정 이벤트(커스텀이벤트)가 아닌, 진짜 그냥 부모의 이벤트를 실행시키고자 할 때 .native를 붙인다.
new Vue({
  el : '#customEvent',
  data : {
    total : 0
  },
  methods : {
    incrementTotal(text){
      console.log(text)
      this.total++;
    },
    nativeEvent(){
      console.log('커스텀이벤트가 아니라 진짜 그냥 눌렀을 때 실행되는 부모의 메소드')
    }
  },
  components : {
    'button-counter' : {
      props : ['num', 'setparaentdata'],
      template : `
        <button @click="incrementCounter">{{counter}}</button>
      `,
      data(){
        return {
          counter : this.num
        }
      },
      methods : {
        incrementCounter(){
          this.counter++;
          const childCount = this.counter;
          this.$emit('increment', childCount)
        }
      }
    },
  }
})

//    3) .sync 수식어