// 1. v-for
//    v-for 디렉티브를 사용하여 배열을 기반으로 리스트 렌더링을 할 수 있다. 
//    item in items(item of items) 형태의 특별한 문법이 필요하며, items는 원본 데이터의 배열이고 item은 반복되는 배열 엘리먼트의 별칭이다.
//    첫번째 인자로 해당 배열의 값을 받고, 두번째로 index값을 받는다.
new Vue({
  el : '#v-for',
  data : {
    items : [
      {message : 'Foo'},
      {message : 'Bar'}
    ]
  }
})

// 2. v-for-object
//    v-for를 활용하여 객체의 속성을 반복할 수 있습니다.
//    첫번째 인자로 값, 두번째 인자로 key를 조회할 수 있으며, 세번째 인자로 index를 조회할 수 있다.
new Vue({
  el : '#v-for-object',
  data : {
    object : {
      title : 'How to do lists in Vue',
      author : 'Jane Doe',
      published : '2016-04-10'
    }
  }
})

// 3. Maintaining State
//    Vue에서 개별 DOM 노드들을 추적하고, 기존 엘리먼트를 재사용, 재정렬하기 위해서 v-for의 각 항목들에 고유한 key 속성을 제공해야 한다.
//    쉽게 말해서, 사용자 정의 template 만들 때 item of items의 item이 하위 컴포넌트의 속성으로 전달되어 하위컴포넌트가 반복생성되야 할 경우(하위 컴포넌트가 v-for로부터 받은 item에게 의존할 때), key를 지정해줘야한다.
//    그냥 v-for 할 때 key 해주는게 정석이라고함

// 4. 배열 변경 감지
//    Vue는 감시중인 배열의 변이 메소드(push, pop, shift, splice 등등..)를 래핑하여 다시 렌더링 합니다.

new Vue({
  el : '#maintaining-state',
  data : {
    userData : {
      id : 'sangmin802',
      name : '박상민'
    },
    arr : [
      {id : 1, name : '모여요꿈동산', classValue : '바드'},
      {id : 2, name : '퐁메라니안', classValue : '서머너'},
      {id : 3, name : '한대만칠겡', classValue : '디스트로이어'},
    ]
  },
  methods : {
    reverse(){
      const newArr = [...this.arr].reverse(); // 최대한 immutable
      this.arr = newArr;
    },
    mainChar(){
      const newArr = [...this.arr];
      newArr.map(res => {
        if(res.id === 1){
          return res.name="★모여요꿈동산"
        }
      })
    },
  }
})

// 5. 필터링 / 정렬된 결과 표시하기
//    때로 원본 데이터를 변경하지않고, 필터링된 버전이나 정렬된 버전을 표시해야할 필요가 있습니다. 이경우, 해당 과정을 거친 배열을 반환하는 계산된 속성을 만들 수 있다.

// 6. Range v-for
//    v-for는 숫자를 사용할 수 있습니다. 템플릿을 특정 횟수만큼 반복할 때 사용합니다.
new Vue({
  el : '#computedArr',
  data : {
    arr : [
      {id : 1, name : '사과', sale : true},
      {id : 2, name : '포도', sale : false},
      {id : 3, name : '오렌지', sale : false},
      {id : 4, name : '바나나', sale : true}
    ]
  },
  computed : {
    onSale(){
      const newArr = [...this.arr].filter(res => res.sale);
      return newArr;
    }
  }
})

// 7. v-for과 v-if
//    v-for는 v-if보다 높은 우선순의를 갖고 있습니다. 즉, v-if는 for 루프가 반복될 때 마다 실행되며, 일부 템플릿만 렌더링하려는 경우 유용하다.
new Vue({
  el : '#v-for_v-if',
  data : {
    todos : [
      {id : 1, text : 'Vue 공부하기', complete : false},
      {id : 2, text : 'JavaScript 공부하기', complete : true},
      {id : 3, text : 'React 공부하기', complete : true},
      {id : 4, text : 'TypeScript 공부하기', complete : false},
    ]
  }
})

// 8. v-for과 컴포넌트
Vue.component('my-component', {
  props : ['id', 'name'],
  template : `
    <div>
      {{id}}. {{name}}
    </div>
  `
})
new Vue({
  el : '#v-for_component',
  data : {
    items : [
      {id : 1, name : '사과'},
      {id : 2, name : '포도'},
      {id : 3, name : '오렌지'},
      {id : 4, name : '바나나'}
    ]
  }
})

// component, v-for를 활용한 todolist
// is="Todo"이유
//    HTML DOM에서 ul태그의 자식으로는 li가 오는데, Todo태그를  직접넣으면 오류가 발생할 수 있으므로, li로 써준다음 is="Todo"라고 정의해준다. 해석하면, li는 Todo 입니다 이런식.
Vue.component('Todo', {
  props : ['id', 'text', 'remove'],
  template : `
    <li>
      {{id}}. {{text}}
      <button @click="remove(id)">지우기</button>
    </li>
  `
})
new Vue({
  el : '#todoList',
  data : {
    newTodo : null,
    nextTodoId : 5,
    todoList : [
      {id : 1, text : 'Vue 공부하기'},
      {id : 2, text : 'JavaScript 공부하기'},
      {id : 3, text : 'React 공부하기'},
      {id : 4, text : 'TypeScript 공부하기'},
    ]
  },
  methods : {
    add(){
      const newTodoList = [...this.todoList];
      newTodoList.push({id : this.nextTodoId, text : this.newTodo});
      this.todoList = newTodoList;
      this.nextTodoId++;
      this.newTodo=null;
    },
    remove(_id){
      const newTodoList = [...this.todoList].filter(res => res.id!==_id);
      console.log(newTodoList)
      this.todoList = newTodoList;
    }
  }
})