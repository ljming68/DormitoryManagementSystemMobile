<template>
    <div class="main">
        首页内容

        <mt-cell-swipe
        title="标题文字"
        :right="[
          {
            content: 'Delete',
            style: { background: 'red', color: '#fff' },
            handler: () => this.$messagebox('delete')
          }
        ]">
        </mt-cell-swipe>

        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>


    </div>
</template>

<script>
import Vue from 'vue'
import { CellSwipe,Picker } from 'mint-ui';

Vue.use(CellSwipe.name, CellSwipe,Picker);
export default {

  data(){
    return {
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]

    }
  },

  methods:{
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
  }
    
}
</script>