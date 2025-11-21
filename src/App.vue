<template>
  <div>
    <Beverage :isIced="beverageStore.currentTemp === 'Cold'" />
    <ul>
      <li>
        <template v-for="temp in beverageStore.temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="beverageStore.currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
    </ul>
    <ul>
      <li>
        <template v-for="b in beverageStore.bases" :key="b.id">
          <label>
            <input
              type="radio"
              name="bases"
              :id="`r${b.id}`"
              :value="b"
              v-model="beverageStore.currentBase"
            />
            {{ b.name }}
          </label>
        </template>
      </li>
    </ul>
    <ul>
      <li>
        <template v-for="s in beverageStore.syrups" :key="s.id">
          <label>
            <input
              type="radio"
              name="syrups"
              :id="`r${s.id}`"
              :value="s"
              v-model="beverageStore.currentSyrup"
            />
            {{ s.name }}
          </label>
        </template>
      </li>
    </ul>
    <ul>
      <li>
        <template v-for="c in beverageStore.creamers" :key="c.id">
          <label>
            <input
              type="radio"
              name="creamers"
              :id="`r${c.id}`"
              :value="c"
              v-model="beverageStore.currentCreamer"
            />
            {{ c.name }}
          </label>
        </template>
      </li>
    </ul>
    <input
      type="text"
      placeholder="Beverage Name"
      v-model="beverageStore.currentName"
    />

    <button @click="beverageStore.makeBeverage()">
      🍺 Make Beverage
    </button>
  </div>
  <div id="beverage-container" style="margin-top: 20px">
    <h3 style="color: white; margin-bottom: 10px;">Saved Beverages</h3>

    <div v-if="beverageStore.beverages.length === 0" style="color: white;">
      No saved beverages yet.
    </div>

    <ul v-else>
      <li v-for="bev in beverageStore.beverages" :key="bev.id" style="color: white;">
        <label>
          <input
            type="radio"
            name="saved-beverages"
            :value="bev.id"
            @change="beverageStore.showBeverage(bev)"
          />
          {{ bev.name }} —
          {{ bev.base.name }}, 
          {{ bev.syrup.name }}, 
          {{ bev.creamer.name }}
          ({{ bev.temp }})
        </label>
      </li>
    </ul>
  </div>

</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
const beverageStore = useBeverageStore();
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
</style>
