// 이벤트 핸들링
// 1. 이벤트 청취
//    v-on (@) 디렉티브를 사용하여 DOM 이벤트를 듣고,트리거될 때 JavaScript를 실행할 수 있습니다.
new Vue({
  el : '#event1',
  data : {
    counter : 0
  }
})
// 2. 메소드 이벤트 핸들러
//    많은 이벤트 핸들러의 로직은 더 복잡할 것이므로, JavaScript를 v-on속성값으로 보관하는 인라인 이벤트는 간단하지 않습니다. 이 때문에, 메소드의 이름을 받는것 입니다.
new Vue({
  el : '#event2',
  data : {
    name : 'Vue.js'
  },
  methods : {
    greet(){
      alert(`Hello, ${this.name}!`);
    }
  }
})
// 3. 인라인 메소드 핸들러
//    매개변수를 전달할 수 있습니다.
//    매개변수를 지정하지 않을 때에는 인스턴스의 methods에서 e를 통해 직접조회 가능하지만, 아닐경우 $event를 통해 조회할 수 있습니다.
new Vue({
  el : '#event3',
  methods : {
    say(text, e){
      alert(`${text}! Event Type is ${e.type}`);
    }
  }
})
// 4. 이벤트 수식어
//    이번트 핸들러 내부에서 event.preventDefault() 또는 event.stopPropagation()을 호출하는 것은 매우 보편적인 일 입니다. 이것을 더 편리하게 사용할 수 있도록, v-on이벤트에서는 이벤트 수식어를 제공합니다.
//    여러개를 연달아 사용하는것도 가능합니다.
//    1) .stop : 이벤트 전파를 중지(자신의 영역을 포함하고있는 부모의 메소드를 받지 않음)
//    2) .prevent : 고유 이벤트 제거(대표적으로 페이지 리로드 차단)
//    3) .capture : 하위 엘리먼트보다 먼저 이벤트 호출(기본적으로는 버블링으로 자식의 이벤트 먼저 실행하지만, 해당 선언으로 부모의 이벤트가 먼저 실행되도록 함. 근데 쓸 일 없을듯)
//    4) .self : 오직 자신에게 바인딩된 이벤트만 처리(약간 stop과 다르게, 자식이 부모의 이벤트를 받는게아닌 부모가 이벤트를 안주는느낌. 캡처링 차단?)
//    5) .once : 한번만 실행됨. 이후 요청은 싹 다 무시
//    6) .passive : 해당 이벤트의 기본동작과 바인딩된 이벤트를 동시실행(어케 써야하는지 잘 모르겠음..)
new Vue({
  el : '#event4',
  data : {
    last : 0
  },
  methods : {
    // stop, self, capture, once
    parent(){
      console.log('I am parent method')
    },
    child(){
      console.log('I am child method')
    },
    // prevent

    // passive
    scroll(e){
      this.last++;
    }
  }
})

// 5. 키 수식어
//    키보드 이벤트를 청취할 때, 종종 키 코드를 확인해야 한다. 키코드 수식어를 추가할 수 있다.
//    1) Key Codes
//       @keyup.13 과같이 키코드를 직접 등록할 수 있다.
//    2) 여러개를 동시입력을 통해 이벤트를 호출할 수 있다.
//       @keyup.alt.67 // Alt+c를 동시에 놓았을 때
//    3) exact
//       다른 시스템 수식어와 조합해 그 핸들러가 실행되기 위해 정확한 조합이 눌려야 한다.
new Vue({
  el : '#event5',
  methods : {
    enter(){
      alert('enter')
    },
    pageDown(){
      alert('pageDown')
    },
    alt67(){
      alert('alt67')
    },
    withCtrl(){
      alert('withCtrl');
    },
    onleCtrl(){
      alert('onleCtrl');
    },
    nokey(){
      alert('nokey');
    }
  }
})

// 6. 마우스 수식어
//    키보드처럼 마우스 또한, left, right, middle을 조회할 수 있습니다.
new Vue({
  el : '#event6',
  methods : {
    left(){
      alert('left')
    },
    right(){
      alert('right')
    },
    middle(){
      alert('middle')
    }
  }
})