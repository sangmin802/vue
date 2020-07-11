new Vue({
  el : '#selected',
  data : {
    video : [
      {name : 'video1'},
      {name : 'video2'},
      {name : 'video3'},
      {name : 'video4'},
      {name : 'video5'},
    ],
    selected : [], // 1. 컴포넌트로 인풋값 담는상자
    optionWrap : {
      option0 : {
        target : null,
        sec : null,
        fps : null
      },
      option1 : {
        target : null,
        sec : null,
        fps : null
      }
    }
  },
  computed : {
    videoLimit2(){ // 2. 단, 두개까지만 가능하기때문에 computed로 최대 두개를 유지시켜줌
      if(this.selected.length > 2){ // 3. 두개 넘어가면 가장 먼저것을 날려버림
        this.selected.splice(0,1);
      }else if(this.selected.length === 1){ // 4. 두개선택한거에서 만약 하나 지우면 옵션창이 자동으로 남아있는거로 타겟설정됨
        this.setOption = this.selected[0];
      }
      return this.selected;
    }
  },
  methods : {
    save(){
      // gif변환 누르면, 선택된것을 순환하여 같은 순서의 옵션을 배정해주고
      const wrap = [...this.selected].map((res, index) => {
        return {
          ...this.optionWrap['option'+index],
          target : res
        }
      })
      console.log(wrap)
      // 모두 리셋
      this.optionReset()
    },
    optionReset(){
      this.selected = [];
      this.optionWrap = {
        option0 : {
          target : null,
          sec : null,
          fps : null
        },
        option1 : {
          target : null,
          sec : null,
          fps : null
        }
      }
    }
  },


  components : {
    'input-check' : {
      props : ['data'],
      template : `
      <div>
        <slot name="inputwrap" v-for="(item, index) of data" :item="item" :id="index">
        </slot>
      </div>
      `,
    }
  }
})
