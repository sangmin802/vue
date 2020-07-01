// Vue Instance
// 모든 Vue 앱은 Vue 메소드로 새 Vue 인스턴스를 만드는것부터 시작된다.

// 1. 속성과 메소드
//    각 Vue 인스턴스는 data객체에 있는 모든 속성을 참조합니다.
//      -> data라는 변수명 사용을 자제해야할듯
//    다른 사용자 지정 속성과 구분을 위해 $접두어를 사용할 수 있다고 함.
//      -> 무슨용도일지는 잘..
const data = {a : 1};
const vm = new Vue({
  data
})
console.log(vm.a === data.a) // true
console.log(vm.data === data) // false
console.log(vm.$data === data) // true
vm.a = 2;
console.log(data.a) // 2
data.a = 3;
console.log(vm.a) // 3
//    데이터의 값이 변경되면 화면은 다시 렌더링됩니다.
//    하지만, data가 보유하고 있는 값들만 위의 렌더링조건에 해당되며, 값이추가되는것에는 새롭게 렌더링되지 않습니다.
//      -> 따라서, null, [] 등의 초기값을 설정해주어야 합니다.

// 2. 인스턴스 라이프사이클 훅
//    Vue 인스턴스는 생성될 때, 일련의 초기화 단계를 거치며, 아래의 4가지 경우 라이스사이클훅도 호출된다.
//      1) 데이터 관찰 설정이 필요한경우
//      2) 템플릿을 컴파일하는 경우
//      3) 인스턴스를 DOM에 마운트(연결? 생성?)하는 경우
//      4) 데이터가 변경되어 DOM을 업데이트하는 경우
new Vue({
  el : '#lifeCycle',
  data : {
    text : null,
  },
  created(){ // Vue 인스턴스가 생성되었을 때
    // 여기서, 추가적인 data를 설정합니다.
    console.log('인스턴스가 생성되었습니다.');
  },
  mounted(){ // 인스턴스나 컴포넌트가 DOM에 추가되었을 때
    // 하지만, 모든 컴포넌트가 추가되었다고는 보장할 수 없음
    this.$nextTick(() => { // 모든 컴포넌트가 추가되고 화면이 렌더링
      this.text = 'DOM이 생성되었습니다.'
      console.log('DOM이 생성되었습니다.');
    })
  },
  updated(){ // DOM이 재 랜더링 된 후 실행
    // mounted와 마찬가지로, 재 랜더링이 끝났다는것이 보장된 상태는
    this.$nextTick(() => {
      console.log('DOM이 업데이트되었습니다.')
    })
  },
  destroyed(){ // 컴포넌트가 제거될 때

  }
})