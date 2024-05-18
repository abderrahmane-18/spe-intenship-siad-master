<template>
    <p>abderrahmane</p>
   <tbody>
    <tr >
   <td>{{ id }} </td>
   <td >{{titre}}</td>

    </tr>
</tbody>
<!-- <template v-for="(item,index) in ob" :key="index"> -->

<template v-for="item in ob" :key="item.id">
  <template  v-for="item in ob" :key="item.id">

          <!--   <template v-for="(gr,item1) in ob.groupe" :key="item1"> -->  
                
        <tr >
          <td  class="border border-black py-1 px-2">{{ item.id  }}</td>
          <td   class="border border-black py-1 px-2">{{ item.designation }}</td>
          <td    class="border border-black py-1 px-2">{{ item.groupe[1].gr_number }}</td>

          
          <td  class="border border-black py-1 px-2">{{ item.groupe [1].equipements }}</td>
          
        </tr>
      </template>
    </template>
 <!-- 
/***************** */



<template v-for="(design, index_designation) in ob" :key="index_designation">
        <tr>
          <td :rowspan="groupLength(design)" class="border border-black py-1 px-2">{{ index_designation }}</td>
          <td :rowspan="groupLength(design)" class="border border-black py-1 px-2">{{ design.designation }}</td>
          <td class="border border-black py-1 px-2">{{ design.groupes[0].gr_number }}</td>
          <td class="border border-black py-1 px-2">{{ design.groupes[0].equipements[0] }}</td>
      
          </tr>
        <tr v-for="(groupe, index_group) in design.groupes.slice(1)" :key="index_group">
          <td class="border border-black py-1 px-2">{{ groupe.gr_number }}</td>
          <td class="border border-black py-1 px-2">{{ groupe.equipements[0] }}</td>
      
        </tr>
      </template>



*/////////////


<tr  v-for="(item,index) in ob" :key="index">
          <td v-if="index == 0" :rowspan="7"       class="border border-black py-1 px-2">{{ item.id  }}</td>
          <td v-if="index == 0" :rowspan="7"   class="border border-black py-1 px-2">{{ item.designation }}</td>
      
          <td    v-if="index == 0"    :rowspan="4"      class="border border-black py-1 px-2">{{ item.groupe[0] }}</td>
       
          
          <td  v-if="index == 0"    :rowspan="4"  class="border border-black py-1 px-2">{{item.groupe[0].equipements}}</td>
          <td class="border border-black py-1 px-2"></td>








*//////////
        <tr>
          
          <td class="border border-black py-1 px-2"  rowspan="7">1</td>
          <td class="border border-black py-1 px-2" rowspan="7">Contrôle d'échange des réfrigérants NORIA</td>
          <td class="border border-black py-1 px-2" rowspan="4">Gr1</td>
          <td class="border border-black py-1 px-2 text-center">21</td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
        </tr>
        <tr>
    
          <td class="border border-black py-1 px-2 text-center">22</td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
          <td class="border border-black py-1 px-2"></td>
        
        </tr>
        <tr>

        <td class="border border-black py-1 px-2 text-center">31</td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
     
        </tr>
        <tr>
    
        <td class="border border-black py-1 px-2 text-center">32</td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
       
        </tr>
        <tr>
   
        <td rowspan="3" class="border border-black py-1 px-2">Gr 3</td>
        <td class="border border-black py-1 px-2 text-center">21</td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        <td class="border border-black py-1 px-2"></td>
        </tr>
        -->
</template>

<script setup>

import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  
  id: {
    type: Number,
    required: 1,
  },
titre: {
    type: String,
    required: '',
  },
 Groupe: {
    type: Array,
    default: [[]],
  },
 
})

//const emit = defineEmits(['close', 'save', 'addCategory', 'updateCategory'])

const id = ref(props.id)
const titre = ref(props.titre)
const Groupe = ref(props.Groupe)
const store = useStore()

</script>